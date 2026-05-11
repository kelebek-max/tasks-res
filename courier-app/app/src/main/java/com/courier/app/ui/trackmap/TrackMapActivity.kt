package com.courier.app.ui.trackmap

import android.location.Location
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import com.courier.app.databinding.ActivityTrackMapBinding
import org.json.JSONArray
import org.osmdroid.config.Configuration
import org.osmdroid.tileprovider.tilesource.TileSourceFactory
import org.osmdroid.util.BoundingBox
import org.osmdroid.util.GeoPoint
import org.osmdroid.views.overlay.Marker
import org.osmdroid.views.overlay.Polyline
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

class TrackMapActivity : AppCompatActivity() {

    private lateinit var binding: ActivityTrackMapBinding

    companion object {
        const val EXTRA_POINTS_JSON = "points_json"
        const val EXTRA_START_TIME = "start_time"
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityTrackMapBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.toolbar.setNavigationOnClickListener { finish() }

        Configuration.getInstance().userAgentValue = packageName

        binding.trackMapView.setTileSource(TileSourceFactory.MAPNIK)
        binding.trackMapView.setMultiTouchControls(true)

        val pointsJson = intent.getStringExtra(EXTRA_POINTS_JSON) ?: "[]"
        val startTime = intent.getLongExtra(EXTRA_START_TIME, 0L)

        val points = parsePoints(pointsJson)
        displayRoute(points)
        displayInfo(points, pointsJson, startTime)
    }

    private fun parsePoints(json: String): List<GeoPoint> {
        val result = mutableListOf<GeoPoint>()
        try {
            val arr = JSONArray(json)
            for (i in 0 until arr.length()) {
                val point = arr.getJSONArray(i)
                result.add(GeoPoint(point.getDouble(0), point.getDouble(1)))
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
        return result
    }

    private fun displayRoute(points: List<GeoPoint>) {
        if (points.isEmpty()) return

        val polyline = Polyline().apply {
            outlinePaint.strokeWidth = 10f
            outlinePaint.color = ContextCompat.getColor(
                this@TrackMapActivity, android.R.color.holo_blue_dark
            )
            setPoints(points)
        }
        binding.trackMapView.overlays.add(polyline)

        val startMarker = Marker(binding.trackMapView).apply {
            position = points.first()
            setAnchor(Marker.ANCHOR_CENTER, Marker.ANCHOR_BOTTOM)
            title = "Старт"
            icon = ContextCompat.getDrawable(
                this@TrackMapActivity,
                com.courier.app.R.drawable.ic_delivery_point
            )
        }
        binding.trackMapView.overlays.add(startMarker)

        if (points.size > 1) {
            val endMarker = Marker(binding.trackMapView).apply {
                position = points.last()
                setAnchor(Marker.ANCHOR_CENTER, Marker.ANCHOR_BOTTOM)
                title = "Финиш"
                icon = ContextCompat.getDrawable(
                    this@TrackMapActivity,
                    com.courier.app.R.drawable.ic_delivery_done
                )
            }
            binding.trackMapView.overlays.add(endMarker)
        }

        val boundingBox = BoundingBox.fromGeoPointsSafe(points)
        binding.trackMapView.post {
            binding.trackMapView.zoomToBoundingBox(boundingBox, true, 80)
        }
    }

    private fun displayInfo(points: List<GeoPoint>, pointsJson: String, startTime: Long) {
        val distanceKm = calculateDistanceKm(pointsJson)
        binding.infoDistance.text = String.format("%.2f км", distanceKm)
        binding.infoPoints.text = points.size.toString()

        if (startTime > 0) {
            val sdf = SimpleDateFormat("dd.MM.yy", Locale.getDefault())
            binding.infoDate.text = sdf.format(Date(startTime))
        }
    }

    private fun calculateDistanceKm(pointsJson: String): Double {
        try {
            val arr = JSONArray(pointsJson)
            if (arr.length() < 2) return 0.0

            var totalMeters = 0.0
            for (i in 1 until arr.length()) {
                val prev = arr.getJSONArray(i - 1)
                val curr = arr.getJSONArray(i)
                val results = FloatArray(1)
                Location.distanceBetween(
                    prev.getDouble(0), prev.getDouble(1),
                    curr.getDouble(0), curr.getDouble(1),
                    results
                )
                totalMeters += results[0]
            }
            return totalMeters / 1000.0
        } catch (e: Exception) {
            return 0.0
        }
    }

    override fun onResume() {
        super.onResume()
        binding.trackMapView.onResume()
    }

    override fun onPause() {
        super.onPause()
        binding.trackMapView.onPause()
    }
}
