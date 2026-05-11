package com.courier.app.data.database

import androidx.room.Database
import androidx.room.RoomDatabase
import com.courier.app.data.dao.TrackDao
import com.courier.app.data.model.TrackEntity

@Database(
    entities = [TrackEntity::class],
    version = 1,
    exportSchema = false
)
abstract class TrackDatabase : RoomDatabase() {
    abstract fun trackDao(): TrackDao
}
