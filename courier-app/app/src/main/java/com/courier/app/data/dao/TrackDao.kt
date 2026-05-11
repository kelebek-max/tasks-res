package com.courier.app.data.dao

import androidx.room.*
import com.courier.app.data.model.TrackEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface TrackDao {
    @Query("SELECT * FROM tracks ORDER BY start_time DESC")
    fun getAllTracks(): Flow<List<TrackEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertTrack(track: TrackEntity)

    @Delete
    suspend fun deleteTrack(track: TrackEntity)
}
