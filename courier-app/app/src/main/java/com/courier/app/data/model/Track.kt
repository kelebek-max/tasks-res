package com.courier.app.data.model

import android.os.Parcelable
import kotlinx.parcelize.Parcelize
import org.osmdroid.util.GeoPoint

@Parcelize
data class Track(
    val id: Long = System.currentTimeMillis(),
    val points: List<GeoPoint>,
    val startTime: Long = System.currentTimeMillis()
) : Parcelable
