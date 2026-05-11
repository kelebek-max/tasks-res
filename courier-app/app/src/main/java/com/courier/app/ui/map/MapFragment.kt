package com.courier.app.ui.map

import android.Manifest
import android.content.pm.PackageManager
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.activity.result.contract.ActivityResultContracts
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import androidx.lifecycle.lifecycleScope
import com.google.android.material.bottomsheet.BottomSheetDialog
import com.courier.app.R
import com.courier.app.data.api.DeliveryApiService
import com.courier.app.data.api.MockDeliveryApiService
import com.courier.app.data.model.DeliveryPoint
import com.courier.app.data.model.PointStatus
import com.courier.app.databinding.FragmentCommentSheetBinding
import com.courier.app.databinding.FragmentMapBinding
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationCallback
import com.google.android.gms.location.LocationRequest
import com.google.android.gms.location.LocationResult
import com.google.android.gms.location.LocationServices
import com.google.android.gms.location.Priority
import kotlinx.coroutines.Job
import org.osmdroid.views.overlay.Polyline
import kotlinx.coroutines.launch
import org.osmdroid.config.Configuration
import org.osmdroid.tileprovider.tilesource.TileSourceFactory
import org.osmdroid.util.GeoPoint
import org.osmdroid.views.overlay.Marker

class MapFragment : Fragment() {

    private var _binding: FragmentMapBinding? = null
    private val binding get() = _binding!!

    private lateinit var fusedLocationClient: FusedLocationProviderClient
    private var locationCallback: LocationCallback? = null
    private var locationMarker: Marker? = null
    private var trackLine: Polyline? = null
    private val trackPoints = mutableListOf<GeoPoint>()
    
    // Состояние записи трека
    private var isRecordingTrack = false
    
    // Для вычисления скорости
    private var lastLocationTime: Long = 0
    private var lastLocationPoint: GeoPoint? = null
    
    private val apiService: DeliveryApiService = MockDeliveryApiService()
    private val deliveryMarkers = mutableListOf<Marker>()
    private var fetchPointsJob: Job? = null
    private var lastFetchLocation: GeoPoint? = null

    // Bottom sheet для комментария
    private var commentSheetBinding: FragmentCommentSheetBinding? = null
    private var commentBottomSheet: com.google.android.material.bottomsheet.BottomSheetDialog? = null

    companion object {
        private const val MIN_DISTANCE_TO_REFETCH_METERS = 200.0
        private const val KEY_TRACK_POINTS = "track_points"
    }

    private val locationPermissionLauncher = registerForActivityResult(
        ActivityResultContracts.RequestMultiplePermissions()
    ) { permissions ->
        val fineGranted = permissions[Manifest.permission.ACCESS_FINE_LOCATION] ?: false
        val coarseGranted = permissions[Manifest.permission.ACCESS_COARSE_LOCATION] ?: false
        if (fineGranted || coarseGranted) {
            startLocationUpdates()
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentMapBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        Configuration.getInstance().userAgentValue = requireContext().packageName

        fusedLocationClient = LocationServices.getFusedLocationProviderClient(requireActivity())

        // Восстанавливаем состояние скорости из сохраненных данных (если есть)
        if (savedInstanceState != null) {
            lastLocationTime = savedInstanceState.getLong("lastLocationTime")
            val lastLat = savedInstanceState.getDouble("lastLat", Double.NaN)
            val lastLon = savedInstanceState.getDouble("lastLon", Double.NaN)
            if (!lastLat.isNaN() && !lastLon.isNaN()) {
                lastLocationPoint = GeoPoint(lastLat, lastLon)
            }
        }

        // Восстанавливаем трек из сохраненных данных (если есть)
        val latitudes = savedInstanceState?.getDoubleArray(KEY_TRACK_POINTS + "_lat")
        val longitudes = savedInstanceState?.getDoubleArray(KEY_TRACK_POINTS + "_lon")
        if (latitudes != null && longitudes != null && latitudes.size == longitudes.size) {
            for (i in latitudes.indices) {
                trackPoints.add(GeoPoint(latitudes[i], longitudes[i]))
            }
            updateTrackLine()
        }

        setupMap()
        setupLocationButton()
        setupCommentButton()
        setupStartTrackButton()
        checkAndRequestPermissions()
    }

    private fun setupMap() {
        // Используем MAPNIK для обеих тем, так как OpenTopoMap недоступен в osmdroid 6.1.18
        val tileSource = TileSourceFactory.MAPNIK
        binding.mapView.setTileSource(tileSource)
        binding.mapView.setMultiTouchControls(true)
        binding.mapView.controller.setZoom(15.0)
        binding.mapView.controller.setCenter(GeoPoint(59.9426, 30.3183))
    }

    private fun isDarkTheme(): Boolean {
        val currentNightMode = resources.configuration.uiMode and android.content.res.Configuration.UI_MODE_NIGHT_MASK
        return currentNightMode == android.content.res.Configuration.UI_MODE_NIGHT_YES
    }

    private fun setupLocationButton() {
        binding.fabMyLocation.setOnClickListener {
            if (hasLocationPermission()) {
                centerOnCurrentLocation()
            } else {
                requestLocationPermissions()
            }
        }
    }

    private fun setupCommentButton() {
        binding.fabAddComment.setOnClickListener {
            showCommentBottomSheet()
        }
    }

    private fun setupStartTrackButton() {
        binding.fabStartTrack.setOnClickListener {
            onTrackButtonClick()
        }
    }

    // Callback для передачи завершённого трека
    var onTrackCompleted: ((List<GeoPoint>) -> Unit)? = null

    private fun onTrackButtonClick() {
        if (isRecordingTrack) {
            // Завершаем запись и сохраняем трек
            isRecordingTrack = false
            binding.fabStartTrack.setImageResource(com.courier.app.R.drawable.ic_start_track)
            
            // Передаём завершённый трек во внешний обработчик
            onTrackCompleted?.invoke(trackPoints.toList())
        } else {
            // Начинаем новую запись
            isRecordingTrack = true
            binding.fabStartTrack.setImageResource(com.courier.app.R.drawable.ic_stop_track)
            
            // Очищаем старый трек и начинаем новый
            trackPoints.clear()
            updateTrackLine()
            
            // Центрируем карту на текущей позиции
            if (hasLocationPermission()) {
                centerOnCurrentLocation()
            }
        }
    }

    private fun showCommentBottomSheet() {
        if (commentBottomSheet == null) {
            commentSheetBinding = FragmentCommentSheetBinding.inflate(layoutInflater)
            
            commentBottomSheet = com.google.android.material.bottomsheet.BottomSheetDialog(requireContext()).apply {
                setCancelable(true)
                setContentView(commentSheetBinding!!.root)
                
                commentSheetBinding!!.btnCancelComment.setOnClickListener {
                    dismiss()
                }
                
                commentSheetBinding!!.btnSaveComment.setOnClickListener {
                    val commentText = commentSheetBinding!!.etCommentInput.text.toString().trim()
                    if (commentText.isNotEmpty()) {
                        // Здесь можно добавить логику сохранения комментария
                        dismiss()
                    }
                }
            }
        }
        
        commentBottomSheet?.show()
    }

    private fun checkAndRequestPermissions() {
        if (hasLocationPermission()) {
            startLocationUpdates()
        } else {
            requestLocationPermissions()
        }
    }

    private fun hasLocationPermission(): Boolean {
        return ContextCompat.checkSelfPermission(
            requireContext(), Manifest.permission.ACCESS_FINE_LOCATION
        ) == PackageManager.PERMISSION_GRANTED ||
        ContextCompat.checkSelfPermission(
            requireContext(), Manifest.permission.ACCESS_COARSE_LOCATION
        ) == PackageManager.PERMISSION_GRANTED
    }

    private fun requestLocationPermissions() {
        locationPermissionLauncher.launch(
            arrayOf(
                Manifest.permission.ACCESS_FINE_LOCATION,
                Manifest.permission.ACCESS_COARSE_LOCATION
            )
        )
    }

    private fun startLocationUpdates() {
        if (!hasLocationPermission()) return

        val locationRequest = LocationRequest.Builder(
            Priority.PRIORITY_HIGH_ACCURACY, 5000L
        ).setMinUpdateIntervalMillis(2000L).build()

        locationCallback = object : LocationCallback() {
            override fun onLocationResult(result: LocationResult) {
                result.lastLocation?.let { location ->
                    val currentPoint = GeoPoint(location.latitude, location.longitude)
                    updateSpeed(location)
                    updateLocationOnMap(currentPoint)
                    fetchDeliveryPointsIfNeeded(currentPoint)
                }
            }
        }

        try {
            fusedLocationClient.requestLocationUpdates(
                locationRequest, locationCallback!!, requireActivity().mainLooper
            )

            fusedLocationClient.lastLocation.addOnSuccessListener { location ->
                location?.let {
                    val point = GeoPoint(it.latitude, it.longitude)
                    updateLocationOnMap(point)
                    binding.mapView.controller.animateTo(point)
                    fetchDeliveryPointsIfNeeded(point)
                }
            }
        } catch (e: SecurityException) {
            e.printStackTrace()
        }
    }

    private fun fetchDeliveryPointsIfNeeded(currentLocation: GeoPoint) {
        val lastLocation = lastFetchLocation
        if (lastLocation != null) {
            val distance = currentLocation.distanceToAsDouble(lastLocation)
            if (distance < MIN_DISTANCE_TO_REFETCH_METERS) return
        }

        lastFetchLocation = currentLocation
        fetchPointsJob?.cancel()
        fetchPointsJob = viewLifecycleOwner.lifecycleScope.launch {
            try {
                val points = apiService.getDeliveryPoints(
                    currentLocation.latitude,
                    currentLocation.longitude
                )
                updateDeliveryMarkers(points)
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }

    private fun updateDeliveryMarkers(points: List<DeliveryPoint>) {
        deliveryMarkers.forEach { marker ->
            binding.mapView.overlays.remove(marker)
        }
        deliveryMarkers.clear()

        points.forEach { point ->
            val marker = Marker(binding.mapView).apply {
                position = GeoPoint(point.latitude, point.longitude)
                setAnchor(Marker.ANCHOR_CENTER, Marker.ANCHOR_BOTTOM)
                title = point.address
                snippet = "${point.clientName} • ${point.estimatedTime}"
                icon = ContextCompat.getDrawable(
                    requireContext(),
                    getMarkerIcon(point.status)
                )
            }
            deliveryMarkers.add(marker)
            binding.mapView.overlays.add(marker)
        }

        binding.mapView.invalidate()
    }

    private fun getMarkerIcon(status: PointStatus): Int {
        return when (status) {
            PointStatus.PENDING -> R.drawable.ic_delivery_point
            PointStatus.IN_PROGRESS -> R.drawable.ic_delivery_active
            PointStatus.DELIVERED -> R.drawable.ic_delivery_done
        }
    }

    private fun updateLocationOnMap(point: GeoPoint) {
        if (locationMarker == null) {
            locationMarker = Marker(binding.mapView).apply {
                setAnchor(Marker.ANCHOR_CENTER, Marker.ANCHOR_CENTER)
                title = "Вы здесь"
                icon = ContextCompat.getDrawable(requireContext(), R.drawable.ic_my_location)
            }
            binding.mapView.overlays.add(locationMarker)
        }
        locationMarker?.position = point
        
        // Центрируем карту за маркером
        binding.mapView.controller.animateTo(point)
        
        // Добавляем точку в трек
        trackPoints.add(point)
        updateTrackLine()
    }
    
    private fun updateSpeed(location: android.location.Location) {
        val currentTime = System.currentTimeMillis()
        
        // Если это первое обновление, просто сохраняем данные
        if (lastLocationTime == 0L || lastLocationPoint == null) {
            lastLocationTime = currentTime
            lastLocationPoint = GeoPoint(location.latitude, location.longitude)
            return
        }
        
        // Вычисляем пройденное расстояние в метрах
        val distanceMeters = lastLocationPoint!!.distanceToAsDouble(
            GeoPoint(location.latitude, location.longitude)
        )
        
        // Вычисляем временной интервал в секундах
        val timeDiffSeconds = (currentTime - lastLocationTime) / 1000.0
        
        // Избегаем деления на ноль и слишком маленьких интервалов
        if (timeDiffSeconds > 0.5 && distanceMeters > 1) {
            // Вычисляем скорость в м/с, затем переводим в км/ч (умножаем на 3.6)
            val speedMs = distanceMeters / timeDiffSeconds
            val speedKmh = speedMs * 3.6
            
            // Обновляем TextView в UI потоке
            activity?.runOnUiThread {
                binding.tvSpeed.text = String.format("%.0f км/ч", speedKmh)
            }
        }
        
        lastLocationTime = currentTime
        lastLocationPoint = GeoPoint(location.latitude, location.longitude)
    }
    
    private fun updateTrackLine() {
        if (trackLine == null) {
            trackLine = Polyline().apply {
                setWidth(8f)
                color = ContextCompat.getColor(requireContext(), android.R.color.holo_blue_dark)
                setPoints(trackPoints)
            }
            binding.mapView.overlays.add(trackLine)
        } else {
            trackLine?.setPoints(trackPoints)
        }
        // Перерисовываем карту после обновления трека
        binding.mapView.invalidate()
    }

    private fun centerOnCurrentLocation() {
        if (!hasLocationPermission()) return
        try {
            fusedLocationClient.lastLocation.addOnSuccessListener { location ->
                location?.let {
                    val point = GeoPoint(it.latitude, it.longitude)
                    binding.mapView.controller.animateTo(point)
                    binding.mapView.controller.setZoom(17.0)
                }
            }
        } catch (e: SecurityException) {
            e.printStackTrace()
        }
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        // Сохраняем точки трека при конфигурационных изменениях
        val latitudes = trackPoints.map { it.latitude }.toDoubleArray()
        val longitudes = trackPoints.map { it.longitude }.toDoubleArray()
        outState.putDoubleArray(KEY_TRACK_POINTS + "_lat", latitudes)
        outState.putDoubleArray(KEY_TRACK_POINTS + "_lon", longitudes)
    }

    override fun onResume() {
        super.onResume()
        binding.mapView.onResume()
        // Переключаем тайлы при изменении системной темы
        setupMap()
    }

    override fun onPause() {
        super.onPause()
        binding.mapView.onPause()
        locationCallback?.let {
            fusedLocationClient.removeLocationUpdates(it)
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        fetchPointsJob?.cancel()
        // Не очищаем trackLine и trackPoints - они будут восстановлены при возврате
        commentBottomSheet?.dismiss()
        commentBottomSheet = null
        commentSheetBinding = null
        _binding = null
    }
}
