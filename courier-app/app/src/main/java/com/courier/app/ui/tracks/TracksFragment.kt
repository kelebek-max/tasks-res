package com.courier.app.ui.tracks

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import com.courier.app.data.model.Track
import com.courier.app.databinding.FragmentTracksBinding
import java.text.SimpleDateFormat
import java.util.*

class TracksFragment : Fragment() {

    private var _binding: FragmentTracksBinding? = null
    private val binding get() = _binding!!

    private val trackList = mutableListOf<Track>()
    
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
        
        // Отображаем пустое состояние при инициализации
        updateEmptyState()
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    /**
     * Обновляет список треков и отображение
     */
    fun updateTracks(tracks: List<Track>) {
        trackList.clear()
        trackList.addAll(tracks)
        
        // Обновляем счётчик
        binding.totalTracksValue.text = trackList.size.toString()
        
        // Очищаем старые элементы списка
        binding.tracksListContainer.removeAllViews()
        
        // Добавляем новые элементы
        trackList.forEach { track ->
            val view = createTrackItemView(track)
            binding.tracksListContainer.addView(view)
        }
        
        updateEmptyState()
    }

    private fun createTrackItemView(track: Track): View {
        val view = LayoutInflater.from(requireContext()).inflate(
            com.courier.app.R.layout.item_track,
            binding.tracksListContainer,
            false
        )
        
        // Форматируем дату и время
        val sdf = SimpleDateFormat("dd.MM.yyyy HH:mm", Locale.getDefault())
        val startTime = sdf.format(Date(track.startTime))
        
        view.findViewById<TextView>(com.courier.app.R.id.track_date).text = startTime
        view.findViewById<TextView>(com.courier.app.R.id.track_points_count).text =
            "${track.points.size} точек"
        
        return view
    }

    private fun updateEmptyState() {
        if (trackList.isEmpty()) {
            binding.emptyStateText.visibility = View.VISIBLE
            binding.totalTracksValue.text = "0"
        } else {
            binding.emptyStateText.visibility = View.GONE
        }
    }
}
