package com.courier.app.ui.map

import android.Manifest
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.content.ServiceConnection
import android.content.pm.PackageManager
import android.content.res.Configuration
import android.graphics.ColorMatrix
import android.graphics.ColorMatrixColorFilter
import android.os.Bundle
import android.os.IBinder
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import androidx.lifecycle.lifecycleScope
import com.google.android.material.bottomsheet.BottomSheetDialog
import com.courier.app.service.TrackingService
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
import kotlinx.coroutines.launch
import org.osmdroid.tileprovider.tilesource.TileSourceFactory
import org.osmdroid.util.GeoPoint
import org.osmdroid.views.overlay.Marker
import org.osmdroid.views.overlay.Polyline

class MapFragment : Fragment() {

    private var _binding: FragmentMapBinding? = null
    private val binding get() = _binding!!

    private lateinit var fusedLocationClient: FusedLocationProviderClient
    private var locationCallback: LocationCallback? = null
    private var locationMarker: Marker? = null
    private var trackLine: Polyline? = null
    private val trackPoints = mutableListOf<GeoPoint>()

    private var isRecordingTrack = false

    private var trackingService: TrackingService? = null
    private var serviceBound = false

    private val serviceConnection = object : ServiceConnection {
        override fun onServiceConnected(name: ComponentName?, service: IBinder?) {
            val binder = service as TrackingService.TrackingBinder
            trackingService = binder.getService()
            serviceBound = true

            trackingService?.onLocationUpdate = { point ->
                activity?.runOnUiThread {
                    trackPoints.add(point)
                    updateTrackLine()
                }
            }

            if (trackingService?.isCurrentlyTracking() == true) {
                isRecordingTrack = true
                binding.fabStartTrack.setImageResource(R.drawable.ic_stop_track)
                val existingPoints = trackingService?.getTrackPoints() ?: emptyList()
                trackPoints.clear()
                trackPoints.addAll(existingPoints)
                updateTrackLine()
            }
        }

        override fun onServiceDisconnected(name: ComponentName?) {
            trackingService?.onLocationUpdate = null
            trackingService = null
            serviceBound = false
        }
    }

    private var lastLocationTime: Long = 0
    private var lastLocationPoint: GeoPoint? = null

    private val apiService: DeliveryApiService = MockDeliveryApiService()
    private val deliveryMarkers = mutableListOf<Marker>()
    private var fetchPointsJob: Job? = null
    private var lastFetchLocation: GeoPoint? = null

    private var pendingComment: String = ""

    companion object {
        private const val MIN_DISTANCE_TO_REFETCH_METERS = 200.0
        private const val KEY_TRACK_POINTS = "track_points"
    }

    var onTrackCompleted: ((List<GeoPoint>, String) -> Unit)? = null

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

        fusedLocationClient = LocationServices.getFusedLocationProviderClient(requireActivity())

        if (savedInstanceState != null) {
            lastLocationTime = savedInstanceState.getLong("lastLocationTime")
            val lastLat = savedInstanceState.getDouble("lastLat", Double.NaN)
            val lastLon = savedInstanceState.getDouble("lastLon", Double.NaN)
            if (!lastLat.isNaN() && !lastLon.isNaN()) {
                lastLocationPoint = GeoPoint(lastLat, lastLon)
            }
        }

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
        bindTrackingService()
    }

    private fun bindTrackingService() {
        val intent = Intent(requireContext(), TrackingService::class.java)
        requireContext().bindService(intent, serviceConnection, Context.BIND_AUTO_CREATE)
    }

    private fun setupMap() {
        binding.mapView.setTileSource(TileSourceFactory.MAPNIK)
        binding.mapView.setMultiTouchControls(true)
        binding.mapView.controller.setZoom(15.0)
        binding.mapView.controller.setCenter(GeoPoint(59.9426, 30.3183))
        applyMapTheme()
    }

    private fun applyMapTheme() {
        val nightMode = resources.configuration.uiMode and Configuration.UI_MODE_NIGHT_MASK
        if (nightMode == Configuration.UI_MODE_NIGHT_YES) {
            val invertMatrix = ColorMatrix(floatArrayOf(
                -1f, 0f, 0f, 0f, 255f,
                0f, -1f, 0f, 0f, 255f,
                0f, 0f, -1f, 0f, 255f,
                0f, 0f, 0f, 1f, 0f
            ))
            val darkenMatrix = ColorMatrix().apply {
                setScale(0.85f, 0.85f, 0.9f, 1f)
            }
            invertMatrix.postConcat(darkenMatrix)
            binding.mapView.overlayManager.tilesOverlay.setColorFilter(
                ColorMatrixColorFilter(invertMatrix)
            )
        } else {
            binding.mapView.overlayManager.tilesOverlay.setColorFilter(null)
        }
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

    private fun onTrackButtonClick() {
        if (isRecordingTrack) {
            isRecordingTrack = false
            binding.fabStartTrack.setImageResource(R.drawable.ic_start_track)

            val points = trackingService?.getTrackPoints() ?: trackPoints.toList()
            onTrackCompleted?.invoke(points, pendingComment)
            pendingComment = ""

            val stopIntent = Intent(requireContext(), TrackingService::class.java).apply {
                action = TrackingService.ACTION_STOP
            }
            requireContext().startService(stopIntent)
        } else {
            isRecordingTrack = true
            binding.fabStartTrack.setImageResource(R.drawable.ic_stop_track)

            trackPoints.clear()
            pendingComment = ""
            updateTrackLine()

            val startIntent = Intent(requireContext(), TrackingService::class.java).apply {
                action = TrackingService.ACTION_START
            }
            ContextCompat.startForegroundService(requireContext(), startIntent)

            if (!serviceBound) {
                bindTrackingService()
            }

            if (hasLocationPermission()) {
                centerOnCurrentLocation()
            }
        }
    }

    private fun showCommentBottomSheet() {
        val sheetBinding = FragmentCommentSheetBinding.inflate(layoutInflater)
        val dialog = BottomSheetDialog(requireContext()).apply {
            setCancelable(true)
            setContentView(sheetBinding.root)
        }

        sheetBinding.etCommentInput.setText(pendingComment)

        sheetBinding.btnCancelComment.setOnClickListener {
            dialog.dismiss()
        }

        sheetBinding.btnSaveComment.setOnClickListener {
            val commentText = sheetBinding.etCommentInput.text.toString().trim()
            if (commentText.isNotEmpty()) {
                pendingComment = commentText
                Toast.makeText(requireContext(), "Комментарий сохранён", Toast.LENGTH_SHORT).show()
            }
            dialog.dismiss()
        }

        dialog.show()
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
                    updateLocationOnMap(currentPoint, location.bearing)
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

    private fun updateLocationOnMap(point: GeoPoint, bearing: Float = 0f) {
        if (locationMarker == null) {
            locationMarker = Marker(binding.mapView).apply {
                setAnchor(Marker.ANCHOR_CENTER, Marker.ANCHOR_CENTER)
                title = "Вы здесь"
                icon = ContextCompat.getDrawable(requireContext(), R.drawable.ic_navigation_arrow)
                setInfoWindow(null)
            }
            binding.mapView.overlays.add(locationMarker)
        }
        locationMarker?.position = point
        locationMarker?.rotation = -bearing

        binding.mapView.controller.animateTo(point)
        binding.mapView.invalidate()

        if (isRecordingTrack) {
            trackPoints.add(point)
            updateTrackLine()
        }
    }

    private fun updateSpeed(location: android.location.Location) {
        val currentTime = System.currentTimeMillis()

        if (lastLocationTime == 0L || lastLocationPoint == null) {
            lastLocationTime = currentTime
            lastLocationPoint = GeoPoint(location.latitude, location.longitude)
            return
        }

        val currentPoint = GeoPoint(location.latitude, location.longitude)
        val distanceMeters = lastLocationPoint!!.distanceToAsDouble(currentPoint)
        val timeDiffSeconds = (currentTime - lastLocationTime) / 1000.0

        if (timeDiffSeconds < 1.0) return

        val speedKmh = if (distanceMeters > 5 && location.accuracy < 20) {
            (distanceMeters / timeDiffSeconds) * 3.6
        } else {
            0.0
        }

        activity?.runOnUiThread {
            binding.tvSpeed.text = String.format("%.0f км/ч", speedKmh)
        }

        lastLocationTime = currentTime
        lastLocationPoint = currentPoint
    }

    private fun updateTrackLine() {
        if (trackLine == null) {
            trackLine = Polyline().apply {
                outlinePaint.strokeWidth = 8f
                outlinePaint.color = ContextCompat.getColor(requireContext(), android.R.color.holo_blue_dark)
                setPoints(trackPoints)
            }
            binding.mapView.overlays.add(trackLine)
        } else {
            trackLine?.setPoints(trackPoints)
        }
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
        val latitudes = trackPoints.map { it.latitude }.toDoubleArray()
        val longitudes = trackPoints.map { it.longitude }.toDoubleArray()
        outState.putDoubleArray(KEY_TRACK_POINTS + "_lat", latitudes)
        outState.putDoubleArray(KEY_TRACK_POINTS + "_lon", longitudes)
        outState.putLong("lastLocationTime", lastLocationTime)
        lastLocationPoint?.let {
            outState.putDouble("lastLat", it.latitude)
            outState.putDouble("lastLon", it.longitude)
        }
    }

    override fun onResume() {
        super.onResume()
        binding.mapView.onResume()
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
        if (serviceBound) {
            trackingService?.onLocationUpdate = null
            requireContext().unbindService(serviceConnection)
            serviceBound = false
        }
        _binding = null
    }
}
