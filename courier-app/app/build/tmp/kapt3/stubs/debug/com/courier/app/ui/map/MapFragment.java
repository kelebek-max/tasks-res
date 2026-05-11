package com.courier.app.ui.map;

@kotlin.Metadata(mv = {1, 9, 0}, k = 1, xi = 48, d1 = {"\u0000\u00b6\u0001\n\u0002\u0018\u0002\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0004\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0000\n\u0002\u0010!\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0000\n\u0002\u0010\u000b\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0010\t\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0018\u0002\n\u0002\u0010\u0011\n\u0002\u0010\u000e\n\u0000\n\u0002\u0018\u0002\n\u0002\u0010 \n\u0002\u0010\u0002\n\u0002\b\u0005\n\u0002\u0018\u0002\n\u0002\b\u0006\n\u0002\u0010\b\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0003\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0011\n\u0002\u0018\u0002\n\u0002\b\u0004\n\u0002\u0018\u0002\n\u0002\b\u0003\u0018\u0000 X2\u00020\u0001:\u0001XB\u0005\u00a2\u0006\u0002\u0010\u0002J\b\u0010.\u001a\u00020&H\u0002J\b\u0010/\u001a\u00020&H\u0002J\u0010\u00100\u001a\u00020&2\u0006\u00101\u001a\u00020\u0018H\u0002J\u0010\u00102\u001a\u0002032\u0006\u00104\u001a\u000205H\u0002J\b\u00106\u001a\u00020\u0016H\u0002J\b\u00107\u001a\u00020\u0016H\u0002J$\u00108\u001a\u0002092\u0006\u0010:\u001a\u00020;2\b\u0010<\u001a\u0004\u0018\u00010=2\b\u0010>\u001a\u0004\u0018\u00010?H\u0016J\b\u0010@\u001a\u00020&H\u0016J\b\u0010A\u001a\u00020&H\u0016J\b\u0010B\u001a\u00020&H\u0016J\u0010\u0010C\u001a\u00020&2\u0006\u0010D\u001a\u00020?H\u0016J\b\u0010E\u001a\u00020&H\u0002J\u001a\u0010F\u001a\u00020&2\u0006\u0010G\u001a\u0002092\b\u0010>\u001a\u0004\u0018\u00010?H\u0016J\b\u0010H\u001a\u00020&H\u0002J\b\u0010I\u001a\u00020&H\u0002J\b\u0010J\u001a\u00020&H\u0002J\b\u0010K\u001a\u00020&H\u0002J\b\u0010L\u001a\u00020&H\u0002J\b\u0010M\u001a\u00020&H\u0002J\b\u0010N\u001a\u00020&H\u0002J\u0016\u0010O\u001a\u00020&2\f\u0010P\u001a\b\u0012\u0004\u0012\u00020Q0%H\u0002J\u0010\u0010R\u001a\u00020&2\u0006\u0010S\u001a\u00020\u0018H\u0002J\u0010\u0010T\u001a\u00020&2\u0006\u0010U\u001a\u00020VH\u0002J\b\u0010W\u001a\u00020&H\u0002R\u0010\u0010\u0003\u001a\u0004\u0018\u00010\u0004X\u0082\u000e\u00a2\u0006\u0002\n\u0000R\u000e\u0010\u0005\u001a\u00020\u0006X\u0082\u0004\u00a2\u0006\u0002\n\u0000R\u0014\u0010\u0007\u001a\u00020\u00048BX\u0082\u0004\u00a2\u0006\u0006\u001a\u0004\b\b\u0010\tR\u0010\u0010\n\u001a\u0004\u0018\u00010\u000bX\u0082\u000e\u00a2\u0006\u0002\n\u0000R\u0010\u0010\f\u001a\u0004\u0018\u00010\rX\u0082\u000e\u00a2\u0006\u0002\n\u0000R\u0014\u0010\u000e\u001a\b\u0012\u0004\u0012\u00020\u00100\u000fX\u0082\u0004\u00a2\u0006\u0002\n\u0000R\u0010\u0010\u0011\u001a\u0004\u0018\u00010\u0012X\u0082\u000e\u00a2\u0006\u0002\n\u0000R\u000e\u0010\u0013\u001a\u00020\u0014X\u0082.\u00a2\u0006\u0002\n\u0000R\u000e\u0010\u0015\u001a\u00020\u0016X\u0082\u000e\u00a2\u0006\u0002\n\u0000R\u0010\u0010\u0017\u001a\u0004\u0018\u00010\u0018X\u0082\u000e\u00a2\u0006\u0002\n\u0000R\u0010\u0010\u0019\u001a\u0004\u0018\u00010\u0018X\u0082\u000e\u00a2\u0006\u0002\n\u0000R\u000e\u0010\u001a\u001a\u00020\u001bX\u0082\u000e\u00a2\u0006\u0002\n\u0000R\u0010\u0010\u001c\u001a\u0004\u0018\u00010\u001dX\u0082\u000e\u00a2\u0006\u0002\n\u0000R\u0010\u0010\u001e\u001a\u0004\u0018\u00010\u0010X\u0082\u000e\u00a2\u0006\u0002\n\u0000R\u001a\u0010\u001f\u001a\u000e\u0012\n\u0012\b\u0012\u0004\u0012\u00020\"0!0 X\u0082\u0004\u00a2\u0006\u0002\n\u0000R.\u0010#\u001a\u0016\u0012\n\u0012\b\u0012\u0004\u0012\u00020\u00180%\u0012\u0004\u0012\u00020&\u0018\u00010$X\u0086\u000e\u00a2\u0006\u000e\n\u0000\u001a\u0004\b\'\u0010(\"\u0004\b)\u0010*R\u0010\u0010+\u001a\u0004\u0018\u00010,X\u0082\u000e\u00a2\u0006\u0002\n\u0000R\u0014\u0010-\u001a\b\u0012\u0004\u0012\u00020\u00180\u000fX\u0082\u0004\u00a2\u0006\u0002\n\u0000\u00a8\u0006Y"}, d2 = {"Lcom/courier/app/ui/map/MapFragment;", "Landroidx/fragment/app/Fragment;", "()V", "_binding", "Lcom/courier/app/databinding/FragmentMapBinding;", "apiService", "Lcom/courier/app/data/api/DeliveryApiService;", "binding", "getBinding", "()Lcom/courier/app/databinding/FragmentMapBinding;", "commentBottomSheet", "Lcom/google/android/material/bottomsheet/BottomSheetDialog;", "commentSheetBinding", "Lcom/courier/app/databinding/FragmentCommentSheetBinding;", "deliveryMarkers", "", "Lorg/osmdroid/views/overlay/Marker;", "fetchPointsJob", "Lkotlinx/coroutines/Job;", "fusedLocationClient", "Lcom/google/android/gms/location/FusedLocationProviderClient;", "isRecordingTrack", "", "lastFetchLocation", "Lorg/osmdroid/util/GeoPoint;", "lastLocationPoint", "lastLocationTime", "", "locationCallback", "Lcom/google/android/gms/location/LocationCallback;", "locationMarker", "locationPermissionLauncher", "Landroidx/activity/result/ActivityResultLauncher;", "", "", "onTrackCompleted", "Lkotlin/Function1;", "", "", "getOnTrackCompleted", "()Lkotlin/jvm/functions/Function1;", "setOnTrackCompleted", "(Lkotlin/jvm/functions/Function1;)V", "trackLine", "Lorg/osmdroid/views/overlay/Polyline;", "trackPoints", "centerOnCurrentLocation", "checkAndRequestPermissions", "fetchDeliveryPointsIfNeeded", "currentLocation", "getMarkerIcon", "", "status", "Lcom/courier/app/data/model/PointStatus;", "hasLocationPermission", "isDarkTheme", "onCreateView", "Landroid/view/View;", "inflater", "Landroid/view/LayoutInflater;", "container", "Landroid/view/ViewGroup;", "savedInstanceState", "Landroid/os/Bundle;", "onDestroyView", "onPause", "onResume", "onSaveInstanceState", "outState", "onTrackButtonClick", "onViewCreated", "view", "requestLocationPermissions", "setupCommentButton", "setupLocationButton", "setupMap", "setupStartTrackButton", "showCommentBottomSheet", "startLocationUpdates", "updateDeliveryMarkers", "points", "Lcom/courier/app/data/model/DeliveryPoint;", "updateLocationOnMap", "point", "updateSpeed", "location", "Landroid/location/Location;", "updateTrackLine", "Companion", "app_debug"})
public final class MapFragment extends androidx.fragment.app.Fragment {
    @org.jetbrains.annotations.Nullable()
    private com.courier.app.databinding.FragmentMapBinding _binding;
    private com.google.android.gms.location.FusedLocationProviderClient fusedLocationClient;
    @org.jetbrains.annotations.Nullable()
    private com.google.android.gms.location.LocationCallback locationCallback;
    @org.jetbrains.annotations.Nullable()
    private org.osmdroid.views.overlay.Marker locationMarker;
    @org.jetbrains.annotations.Nullable()
    private org.osmdroid.views.overlay.Polyline trackLine;
    @org.jetbrains.annotations.NotNull()
    private final java.util.List<org.osmdroid.util.GeoPoint> trackPoints = null;
    private boolean isRecordingTrack = false;
    private long lastLocationTime = 0L;
    @org.jetbrains.annotations.Nullable()
    private org.osmdroid.util.GeoPoint lastLocationPoint;
    @org.jetbrains.annotations.NotNull()
    private final com.courier.app.data.api.DeliveryApiService apiService = null;
    @org.jetbrains.annotations.NotNull()
    private final java.util.List<org.osmdroid.views.overlay.Marker> deliveryMarkers = null;
    @org.jetbrains.annotations.Nullable()
    private kotlinx.coroutines.Job fetchPointsJob;
    @org.jetbrains.annotations.Nullable()
    private org.osmdroid.util.GeoPoint lastFetchLocation;
    @org.jetbrains.annotations.Nullable()
    private com.courier.app.databinding.FragmentCommentSheetBinding commentSheetBinding;
    @org.jetbrains.annotations.Nullable()
    private com.google.android.material.bottomsheet.BottomSheetDialog commentBottomSheet;
    private static final double MIN_DISTANCE_TO_REFETCH_METERS = 200.0;
    @org.jetbrains.annotations.NotNull()
    private static final java.lang.String KEY_TRACK_POINTS = "track_points";
    @org.jetbrains.annotations.NotNull()
    private final androidx.activity.result.ActivityResultLauncher<java.lang.String[]> locationPermissionLauncher = null;
    @org.jetbrains.annotations.Nullable()
    private kotlin.jvm.functions.Function1<? super java.util.List<? extends org.osmdroid.util.GeoPoint>, kotlin.Unit> onTrackCompleted;
    @org.jetbrains.annotations.NotNull()
    public static final com.courier.app.ui.map.MapFragment.Companion Companion = null;
    
    public MapFragment() {
        super();
    }
    
    private final com.courier.app.databinding.FragmentMapBinding getBinding() {
        return null;
    }
    
    @java.lang.Override()
    @org.jetbrains.annotations.NotNull()
    public android.view.View onCreateView(@org.jetbrains.annotations.NotNull()
    android.view.LayoutInflater inflater, @org.jetbrains.annotations.Nullable()
    android.view.ViewGroup container, @org.jetbrains.annotations.Nullable()
    android.os.Bundle savedInstanceState) {
        return null;
    }
    
    @java.lang.Override()
    public void onViewCreated(@org.jetbrains.annotations.NotNull()
    android.view.View view, @org.jetbrains.annotations.Nullable()
    android.os.Bundle savedInstanceState) {
    }
    
    private final void setupMap() {
    }
    
    private final boolean isDarkTheme() {
        return false;
    }
    
    private final void setupLocationButton() {
    }
    
    private final void setupCommentButton() {
    }
    
    private final void setupStartTrackButton() {
    }
    
    @org.jetbrains.annotations.Nullable()
    public final kotlin.jvm.functions.Function1<java.util.List<? extends org.osmdroid.util.GeoPoint>, kotlin.Unit> getOnTrackCompleted() {
        return null;
    }
    
    public final void setOnTrackCompleted(@org.jetbrains.annotations.Nullable()
    kotlin.jvm.functions.Function1<? super java.util.List<? extends org.osmdroid.util.GeoPoint>, kotlin.Unit> p0) {
    }
    
    private final void onTrackButtonClick() {
    }
    
    private final void showCommentBottomSheet() {
    }
    
    private final void checkAndRequestPermissions() {
    }
    
    private final boolean hasLocationPermission() {
        return false;
    }
    
    private final void requestLocationPermissions() {
    }
    
    private final void startLocationUpdates() {
    }
    
    private final void fetchDeliveryPointsIfNeeded(org.osmdroid.util.GeoPoint currentLocation) {
    }
    
    private final void updateDeliveryMarkers(java.util.List<com.courier.app.data.model.DeliveryPoint> points) {
    }
    
    private final int getMarkerIcon(com.courier.app.data.model.PointStatus status) {
        return 0;
    }
    
    private final void updateLocationOnMap(org.osmdroid.util.GeoPoint point) {
    }
    
    private final void updateSpeed(android.location.Location location) {
    }
    
    private final void updateTrackLine() {
    }
    
    private final void centerOnCurrentLocation() {
    }
    
    @java.lang.Override()
    public void onSaveInstanceState(@org.jetbrains.annotations.NotNull()
    android.os.Bundle outState) {
    }
    
    @java.lang.Override()
    public void onResume() {
    }
    
    @java.lang.Override()
    public void onPause() {
    }
    
    @java.lang.Override()
    public void onDestroyView() {
    }
    
    @kotlin.Metadata(mv = {1, 9, 0}, k = 1, xi = 48, d1 = {"\u0000\u0018\n\u0002\u0018\u0002\n\u0002\u0010\u0000\n\u0002\b\u0002\n\u0002\u0010\u000e\n\u0000\n\u0002\u0010\u0006\n\u0000\b\u0086\u0003\u0018\u00002\u00020\u0001B\u0007\b\u0002\u00a2\u0006\u0002\u0010\u0002R\u000e\u0010\u0003\u001a\u00020\u0004X\u0082T\u00a2\u0006\u0002\n\u0000R\u000e\u0010\u0005\u001a\u00020\u0006X\u0082T\u00a2\u0006\u0002\n\u0000\u00a8\u0006\u0007"}, d2 = {"Lcom/courier/app/ui/map/MapFragment$Companion;", "", "()V", "KEY_TRACK_POINTS", "", "MIN_DISTANCE_TO_REFETCH_METERS", "", "app_debug"})
    public static final class Companion {
        
        private Companion() {
            super();
        }
    }
}