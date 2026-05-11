package com.courier.app

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import androidx.lifecycle.lifecycleScope
import com.courier.app.data.database.TrackDatabase
import com.courier.app.data.model.TrackEntity
import com.courier.app.databinding.ActivityMainBinding
import com.courier.app.ui.map.MapFragment
import com.courier.app.ui.profile.ProfileFragment
import com.courier.app.ui.tracks.TracksFragment
import kotlinx.coroutines.launch
import org.json.JSONArray
import org.osmdroid.util.GeoPoint

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    private lateinit var mapFragment: MapFragment
    private lateinit var profileFragment: ProfileFragment
    private lateinit var tracksFragment: TracksFragment
    private var activeFragment: Fragment? = null

    private val database by lazy { TrackDatabase.getInstance(this) }
    private val trackDao by lazy { database.trackDao() }

    companion object {
        private const val TAG_MAP = "fragment_map"
        private const val TAG_PROFILE = "fragment_profile"
        private const val TAG_TRACKS = "fragment_tracks"
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
                .add(R.id.fragmentContainer, profileFragment, TAG_PROFILE)
                .hide(profileFragment)
                .add(R.id.fragmentContainer, mapFragment, TAG_MAP)
                .add(R.id.fragmentContainer, tracksFragment, TAG_TRACKS)
                .hide(tracksFragment)
                .commit()

            activeFragment = mapFragment
        } else {
            mapFragment = supportFragmentManager.findFragmentByTag(TAG_MAP) as MapFragment
            profileFragment = supportFragmentManager.findFragmentByTag(TAG_PROFILE) as ProfileFragment
            tracksFragment = supportFragmentManager.findFragmentByTag(TAG_TRACKS) as TracksFragment

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
        mapFragment.onTrackCompleted = { points, comment ->
            saveTrackToDatabase(points, comment)
        }
    }

    private fun saveTrackToDatabase(points: List<GeoPoint>, comment: String) {
        val pointsJson = JSONArray().apply {
            points.forEach { point ->
                put(JSONArray().apply {
                    put(point.latitude)
                    put(point.longitude)
                })
            }
        }.toString()

        lifecycleScope.launch {
            trackDao.insertTrack(
                TrackEntity(
                    pointsJson = pointsJson,
                    comment = comment
                )
            )
        }
    }

    private fun switchFragment(target: Fragment): Boolean {
        if (target == activeFragment) return true
        supportFragmentManager.beginTransaction()
            .hide(activeFragment!!)
            .show(target)
            .commit()
        activeFragment = target
        return true
    }
}
