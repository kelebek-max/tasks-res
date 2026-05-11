package com.courier.app.data.api;

@kotlin.Metadata(mv = {1, 9, 0}, k = 1, xi = 48, d1 = {"\u0000\u001c\n\u0002\u0018\u0002\n\u0002\u0010\u0000\n\u0000\n\u0002\u0010 \n\u0002\u0018\u0002\n\u0000\n\u0002\u0010\u0006\n\u0002\b\u0004\bf\u0018\u00002\u00020\u0001J.\u0010\u0002\u001a\b\u0012\u0004\u0012\u00020\u00040\u00032\u0006\u0010\u0005\u001a\u00020\u00062\u0006\u0010\u0007\u001a\u00020\u00062\b\b\u0002\u0010\b\u001a\u00020\u0006H\u00a6@\u00a2\u0006\u0002\u0010\t\u00a8\u0006\n"}, d2 = {"Lcom/courier/app/data/api/DeliveryApiService;", "", "getDeliveryPoints", "", "Lcom/courier/app/data/model/DeliveryPoint;", "latitude", "", "longitude", "radiusKm", "(DDDLkotlin/coroutines/Continuation;)Ljava/lang/Object;", "app_debug"})
public abstract interface DeliveryApiService {
    
    @org.jetbrains.annotations.Nullable()
    public abstract java.lang.Object getDeliveryPoints(double latitude, double longitude, double radiusKm, @org.jetbrains.annotations.NotNull()
    kotlin.coroutines.Continuation<? super java.util.List<com.courier.app.data.model.DeliveryPoint>> $completion);
    
    @kotlin.Metadata(mv = {1, 9, 0}, k = 3, xi = 48)
    public static final class DefaultImpls {
    }
}