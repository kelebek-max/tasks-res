package com.courier.app.data.api;

@kotlin.Metadata(mv = {1, 9, 0}, k = 1, xi = 48, d1 = {"\u0000$\n\u0002\u0018\u0002\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0010 \n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0000\n\u0002\u0010\u0006\n\u0002\b\u0005\u0018\u00002\u00020\u0001:\u0001\rB\u0005\u00a2\u0006\u0002\u0010\u0002J,\u0010\u0006\u001a\b\u0012\u0004\u0012\u00020\u00070\u00042\u0006\u0010\b\u001a\u00020\t2\u0006\u0010\n\u001a\u00020\t2\u0006\u0010\u000b\u001a\u00020\tH\u0096@\u00a2\u0006\u0002\u0010\fR\u0014\u0010\u0003\u001a\b\u0012\u0004\u0012\u00020\u00050\u0004X\u0082\u0004\u00a2\u0006\u0002\n\u0000\u00a8\u0006\u000e"}, d2 = {"Lcom/courier/app/data/api/MockDeliveryApiService;", "Lcom/courier/app/data/api/DeliveryApiService;", "()V", "basePoints", "", "Lcom/courier/app/data/api/MockDeliveryApiService$PointData;", "getDeliveryPoints", "Lcom/courier/app/data/model/DeliveryPoint;", "latitude", "", "longitude", "radiusKm", "(DDDLkotlin/coroutines/Continuation;)Ljava/lang/Object;", "PointData", "app_debug"})
public final class MockDeliveryApiService implements com.courier.app.data.api.DeliveryApiService {
    @org.jetbrains.annotations.NotNull()
    private final java.util.List<com.courier.app.data.api.MockDeliveryApiService.PointData> basePoints = null;
    
    public MockDeliveryApiService() {
        super();
    }
    
    @java.lang.Override()
    @org.jetbrains.annotations.Nullable()
    public java.lang.Object getDeliveryPoints(double latitude, double longitude, double radiusKm, @org.jetbrains.annotations.NotNull()
    kotlin.coroutines.Continuation<? super java.util.List<com.courier.app.data.model.DeliveryPoint>> $completion) {
        return null;
    }
    
    @kotlin.Metadata(mv = {1, 9, 0}, k = 1, xi = 48, d1 = {"\u00000\n\u0002\u0018\u0002\n\u0002\u0010\u0000\n\u0000\n\u0002\u0010\u000e\n\u0000\n\u0002\u0010\u0006\n\u0002\b\u0004\n\u0002\u0018\u0002\n\u0002\b\u0015\n\u0002\u0010\u000b\n\u0002\b\u0002\n\u0002\u0010\b\n\u0002\b\u0002\b\u0082\b\u0018\u00002\u00020\u0001B=\u0012\u0006\u0010\u0002\u001a\u00020\u0003\u0012\u0006\u0010\u0004\u001a\u00020\u0005\u0012\u0006\u0010\u0006\u001a\u00020\u0005\u0012\u0006\u0010\u0007\u001a\u00020\u0003\u0012\u0006\u0010\b\u001a\u00020\u0003\u0012\u0006\u0010\t\u001a\u00020\n\u0012\u0006\u0010\u000b\u001a\u00020\u0003\u00a2\u0006\u0002\u0010\fJ\t\u0010\u0017\u001a\u00020\u0003H\u00c6\u0003J\t\u0010\u0018\u001a\u00020\u0005H\u00c6\u0003J\t\u0010\u0019\u001a\u00020\u0005H\u00c6\u0003J\t\u0010\u001a\u001a\u00020\u0003H\u00c6\u0003J\t\u0010\u001b\u001a\u00020\u0003H\u00c6\u0003J\t\u0010\u001c\u001a\u00020\nH\u00c6\u0003J\t\u0010\u001d\u001a\u00020\u0003H\u00c6\u0003JO\u0010\u001e\u001a\u00020\u00002\b\b\u0002\u0010\u0002\u001a\u00020\u00032\b\b\u0002\u0010\u0004\u001a\u00020\u00052\b\b\u0002\u0010\u0006\u001a\u00020\u00052\b\b\u0002\u0010\u0007\u001a\u00020\u00032\b\b\u0002\u0010\b\u001a\u00020\u00032\b\b\u0002\u0010\t\u001a\u00020\n2\b\b\u0002\u0010\u000b\u001a\u00020\u0003H\u00c6\u0001J\u0013\u0010\u001f\u001a\u00020 2\b\u0010!\u001a\u0004\u0018\u00010\u0001H\u00d6\u0003J\t\u0010\"\u001a\u00020#H\u00d6\u0001J\t\u0010$\u001a\u00020\u0003H\u00d6\u0001R\u0011\u0010\u0007\u001a\u00020\u0003\u00a2\u0006\b\n\u0000\u001a\u0004\b\r\u0010\u000eR\u0011\u0010\b\u001a\u00020\u0003\u00a2\u0006\b\n\u0000\u001a\u0004\b\u000f\u0010\u000eR\u0011\u0010\u000b\u001a\u00020\u0003\u00a2\u0006\b\n\u0000\u001a\u0004\b\u0010\u0010\u000eR\u0011\u0010\u0002\u001a\u00020\u0003\u00a2\u0006\b\n\u0000\u001a\u0004\b\u0011\u0010\u000eR\u0011\u0010\u0004\u001a\u00020\u0005\u00a2\u0006\b\n\u0000\u001a\u0004\b\u0012\u0010\u0013R\u0011\u0010\u0006\u001a\u00020\u0005\u00a2\u0006\b\n\u0000\u001a\u0004\b\u0014\u0010\u0013R\u0011\u0010\t\u001a\u00020\n\u00a2\u0006\b\n\u0000\u001a\u0004\b\u0015\u0010\u0016\u00a8\u0006%"}, d2 = {"Lcom/courier/app/data/api/MockDeliveryApiService$PointData;", "", "id", "", "latOffset", "", "lngOffset", "address", "clientName", "status", "Lcom/courier/app/data/model/PointStatus;", "estimatedTime", "(Ljava/lang/String;DDLjava/lang/String;Ljava/lang/String;Lcom/courier/app/data/model/PointStatus;Ljava/lang/String;)V", "getAddress", "()Ljava/lang/String;", "getClientName", "getEstimatedTime", "getId", "getLatOffset", "()D", "getLngOffset", "getStatus", "()Lcom/courier/app/data/model/PointStatus;", "component1", "component2", "component3", "component4", "component5", "component6", "component7", "copy", "equals", "", "other", "hashCode", "", "toString", "app_debug"})
    static final class PointData {
        @org.jetbrains.annotations.NotNull()
        private final java.lang.String id = null;
        private final double latOffset = 0.0;
        private final double lngOffset = 0.0;
        @org.jetbrains.annotations.NotNull()
        private final java.lang.String address = null;
        @org.jetbrains.annotations.NotNull()
        private final java.lang.String clientName = null;
        @org.jetbrains.annotations.NotNull()
        private final com.courier.app.data.model.PointStatus status = null;
        @org.jetbrains.annotations.NotNull()
        private final java.lang.String estimatedTime = null;
        
        public PointData(@org.jetbrains.annotations.NotNull()
        java.lang.String id, double latOffset, double lngOffset, @org.jetbrains.annotations.NotNull()
        java.lang.String address, @org.jetbrains.annotations.NotNull()
        java.lang.String clientName, @org.jetbrains.annotations.NotNull()
        com.courier.app.data.model.PointStatus status, @org.jetbrains.annotations.NotNull()
        java.lang.String estimatedTime) {
            super();
        }
        
        @org.jetbrains.annotations.NotNull()
        public final java.lang.String getId() {
            return null;
        }
        
        public final double getLatOffset() {
            return 0.0;
        }
        
        public final double getLngOffset() {
            return 0.0;
        }
        
        @org.jetbrains.annotations.NotNull()
        public final java.lang.String getAddress() {
            return null;
        }
        
        @org.jetbrains.annotations.NotNull()
        public final java.lang.String getClientName() {
            return null;
        }
        
        @org.jetbrains.annotations.NotNull()
        public final com.courier.app.data.model.PointStatus getStatus() {
            return null;
        }
        
        @org.jetbrains.annotations.NotNull()
        public final java.lang.String getEstimatedTime() {
            return null;
        }
        
        @org.jetbrains.annotations.NotNull()
        public final java.lang.String component1() {
            return null;
        }
        
        public final double component2() {
            return 0.0;
        }
        
        public final double component3() {
            return 0.0;
        }
        
        @org.jetbrains.annotations.NotNull()
        public final java.lang.String component4() {
            return null;
        }
        
        @org.jetbrains.annotations.NotNull()
        public final java.lang.String component5() {
            return null;
        }
        
        @org.jetbrains.annotations.NotNull()
        public final com.courier.app.data.model.PointStatus component6() {
            return null;
        }
        
        @org.jetbrains.annotations.NotNull()
        public final java.lang.String component7() {
            return null;
        }
        
        @org.jetbrains.annotations.NotNull()
        public final com.courier.app.data.api.MockDeliveryApiService.PointData copy(@org.jetbrains.annotations.NotNull()
        java.lang.String id, double latOffset, double lngOffset, @org.jetbrains.annotations.NotNull()
        java.lang.String address, @org.jetbrains.annotations.NotNull()
        java.lang.String clientName, @org.jetbrains.annotations.NotNull()
        com.courier.app.data.model.PointStatus status, @org.jetbrains.annotations.NotNull()
        java.lang.String estimatedTime) {
            return null;
        }
        
        @java.lang.Override()
        public boolean equals(@org.jetbrains.annotations.Nullable()
        java.lang.Object other) {
            return false;
        }
        
        @java.lang.Override()
        public int hashCode() {
            return 0;
        }
        
        @java.lang.Override()
        @org.jetbrains.annotations.NotNull()
        public java.lang.String toString() {
            return null;
        }
    }
}