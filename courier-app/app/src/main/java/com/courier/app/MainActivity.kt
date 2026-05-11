package com.courier.app

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import com.courier.app.data.model.Track
import com.courier.app.databinding.ActivityMainBinding
import com.courier.app.ui.map.MapFragment
import com.courier.app.ui.profile.ProfileFragment
import com.courier.app.ui.tracks.TracksFragment
import org.osmdroid.util.GeoPoint

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    private lateinit var mapFragment: MapFragment
    private lateinit var profileFragment: ProfileFragment
    private lateinit var tracksFragment: TracksFragment
    private var activeFragment: Fragment? = null

    // Список завершённых треков
    private val completedTracks = mutableListOf<Track>()

    companion object {
        private const val TAG_MAP = "fragment_map"
        private const val TAG_PROFILE = "fragment_profile"
        private const val TAG_TRACKS = "fragment_tracks"
        private const val KEY_COMPLETED_TRACKS = "completed_tracks"
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        if (savedInstanceState == null) {
            mapFragment = MapFragment()
            profileFragment = ProfileFragment()
            tracksFragment = TracksFragment()

            setupMapFragmentListener()

            supportFragmentManager.beginTransaction()
                .add(R.id.fragment_container, profileFragment, TAG_PROFILE)
                .hide(profileFragment)
                .add(R.id.fragment_container, mapFragment, TAG_MAP)
                .add(R.id.fragment_container, tracksFragment, TAG_TRACKS)
                .hide(tracksFragment)
                .commit()

            activeFragment = mapFragment
        } else {
            mapFragment = supportFragmentManager.findFragmentByTag(TAG_MAP) as MapFragment
            profileFragment = supportFragmentManager.findFragmentByTag(TAG_PROFILE) as ProfileFragment
            tracksFragment = supportFragmentManager.findFragmentByTag(TAG_TRACKS) as TracksFragment
            
            // Восстанавливаем треки из сохранённого состояния
            val trackData = savedInstanceState.getParcelableArrayList<Track>(KEY_COMPLETED_TRACKS)
            if (trackData != null) {
                completedTracks.addAll(trackData)
            }
            
            setupMapFragmentListener()
            activeFragment = supportFragmentManager.fragments.firstOrNull { !it.isHidden } ?: mapFragment
        }

        binding.bottomNavigation.setOnItemSelectedListener { item ->
            when (item.itemId) {
                R.id.navigation_map -> switchFragment(mapFragment)
                R.id.navigation_tracks -> switchFragment(tracksFragment)
                R.id.navigation_profile -> switchFragment(profileFragment)
            }
            true
        }
    }

    private fun setupMapFragmentListener() {
        mapFragment.onTrackCompleted = { points ->
            val track = Track(points = points)
            completedTracks.add(track)
            
            // Обновляем TracksFragment, если он активен
            if (activeFragment == tracksFragment) {
                tracksFragment.updateTracks(completedTracks)
            }
        }
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        outState.putParcelableArrayList(KEY_COMPLETED_TRACKS, completedTracks as ArrayList<Track>)
    }

    private fun switchFragment(target: Fragment): Boolean {
        if (target == activeFragment) return true
        supportFragmentManager.beginTransaction()
            .hide(activeFragment!!)
            .show(target)
            .commit()
        activeFragment = target
        
        // Если переключаемся на экран треков, обновляем отображение
        if (target == tracksFragment) {
            tracksFragment.updateTracks(completedTracks)
        }
        
        return true
    }
}
