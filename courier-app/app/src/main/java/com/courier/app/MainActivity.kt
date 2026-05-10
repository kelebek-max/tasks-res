package com.courier.app

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import com.courier.app.databinding.ActivityMainBinding
import com.courier.app.ui.map.MapFragment
import com.courier.app.ui.profile.ProfileFragment

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    private lateinit var mapFragment: MapFragment
    private lateinit var profileFragment: ProfileFragment
    private var activeFragment: Fragment? = null

    companion object {
        private const val TAG_MAP = "fragment_map"
        private const val TAG_PROFILE = "fragment_profile"
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        if (savedInstanceState == null) {
            mapFragment = MapFragment()
            profileFragment = ProfileFragment()

            supportFragmentManager.beginTransaction()
                .add(R.id.fragment_container, profileFragment, TAG_PROFILE)
                .hide(profileFragment)
                .add(R.id.fragment_container, mapFragment, TAG_MAP)
                .commit()

            activeFragment = mapFragment
        } else {
            mapFragment = supportFragmentManager.findFragmentByTag(TAG_MAP) as MapFragment
            profileFragment = supportFragmentManager.findFragmentByTag(TAG_PROFILE) as ProfileFragment
            activeFragment = supportFragmentManager.fragments.firstOrNull { !it.isHidden } ?: mapFragment
        }

        binding.bottomNavigation.setOnItemSelectedListener { item ->
            when (item.itemId) {
                R.id.navigation_map -> switchFragment(mapFragment)
                R.id.navigation_profile -> switchFragment(profileFragment)
                else -> false
            }
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
