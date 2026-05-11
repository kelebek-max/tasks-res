package com.courier.app.ui.tracks

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle
import com.courier.app.R
import com.courier.app.data.database.TrackDatabase
import com.courier.app.data.model.TrackEntity
import com.courier.app.databinding.FragmentTracksBinding
import kotlinx.coroutines.launch
import android.location.Location
import com.courier.app.ui.trackmap.TrackMapActivity
import org.json.JSONArray
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

class TracksFragment : Fragment() {

    private var _binding: FragmentTracksBinding? = null
    private val binding get() = _binding!!

    private val trackDao by lazy {
        TrackDatabase.getInstance(requireContext()).trackDao()
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentTracksBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        observeTracks()
    }

    private fun observeTracks() {
        viewLifecycleOwner.lifecycleScope.launch {
            viewLifecycleOwner.repeatOnLifecycle(Lifecycle.State.STARTED) {
                trackDao.getAllTracks().collect { tracks ->
                    updateUI(tracks)
                }
            }
        }
    }

    private fun updateUI(tracks: List<TrackEntity>) {
        binding.totalTracksValue.text = tracks.size.toString()
        binding.tracksListContainer.removeAllViews()

        tracks.forEach { track ->
            val view = createTrackItemView(track)
            binding.tracksListContainer.addView(view)
        }

        binding.emptyStateText.visibility = if (tracks.isEmpty()) View.VISIBLE else View.GONE
    }

    private fun createTrackItemView(track: TrackEntity): View {
        val view = LayoutInflater.from(requireContext()).inflate(
            R.layout.item_track,
            binding.tracksListContainer,
            false
        )

        val sdf = SimpleDateFormat("dd.MM.yyyy HH:mm", Locale.getDefault())
        val startTime = sdf.format(Date(track.startTime))

        val pointsCount = try {
            JSONArray(track.pointsJson).length()
        } catch (e: Exception) {
            0
        }

        val distanceKm = calculateDistanceKm(track.pointsJson)

        view.findViewById<TextView>(R.id.trackDate).text = startTime
        view.findViewById<TextView>(R.id.trackDistance).text = String.format("%.2f км", distanceKm)
        view.findViewById<TextView>(R.id.trackPointsCount).text = "$pointsCount точек"

        val commentView = view.findViewById<TextView>(R.id.trackComment)
        if (track.comment.isNotEmpty()) {
            commentView.text = track.comment
            commentView.visibility = View.VISIBLE
        } else {
            commentView.visibility = View.GONE
        }

        view.setOnClickListener {
            val intent = Intent(requireContext(), TrackMapActivity::class.java).apply {
                putExtra(TrackMapActivity.EXTRA_POINTS_JSON, track.pointsJson)
                putExtra(TrackMapActivity.EXTRA_START_TIME, track.startTime)
            }
            startActivity(intent)
        }

        return view
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

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
