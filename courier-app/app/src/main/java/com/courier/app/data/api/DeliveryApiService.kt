package com.courier.app.data.api

import com.courier.app.data.model.DeliveryPoint

interface DeliveryApiService {
    suspend fun getDeliveryPoints(
        latitude: Double,
        longitude: Double,
        radiusKm: Double = 5.0
    ): List<DeliveryPoint>
}
