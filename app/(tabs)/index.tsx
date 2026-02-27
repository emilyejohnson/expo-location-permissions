import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, Pressable, Alert } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";

const GEOFENCE_TASK = "GEOFENCE_TASK";
const FRIENDZONE_RADIUS_M = 200; // <= 200 meters

// Runs when the OS detects ENTER/EXIT for your region
TaskManager.defineTask(GEOFENCE_TASK, ({ data, error }) => {
  if (error) {
    console.log("Geofence task error:", error);
    return;
  }
  if (!data) return;

  const { eventType, region } = data;
  const type =
    eventType === Location.GeofencingEventType.Enter ? "ENTER" : "EXIT";

  console.log(`[FriendZone] ${type}: ${region.identifier}`);
});

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [geofenceCenter, setGeofenceCenter] = useState(null);
  const [geofencingActive, setGeofencingActive] = useState(false);

  const mapRef = useRef(null);

  useEffect(() => {
    let watchSub;

    (async () => {
      // Foreground permission (required)
      const fg = await Location.requestForegroundPermissionsAsync();
      if (fg.status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // Background permission (recommended for reliable background geofencing)
      const bg = await Location.requestBackgroundPermissionsAsync();
      if (bg.status !== "granted") {
        console.log(
          "Background permission not granted. Geofencing may be limited in background."
        );
      }

      // Get initial location
      const current = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setLocation(current);

      // Keep blue dot updated (optional)
      watchSub = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 3000,
          distanceInterval: 10,
        },
        (loc) => setLocation(loc)
      );
    })();

    return () => {
      if (watchSub) watchSub.remove();
    };
  }, []);

  const startFriendZoneAtUser = async () => {
    if (!location) return;

    const center = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    // 1) Make it visible immediately
    setGeofenceCenter(center);

    // 2) Restart geofencing so the new center is used
    try {
      const already = await Location.hasStartedGeofencingAsync(GEOFENCE_TASK);
      if (already) await Location.stopGeofencingAsync(GEOFENCE_TASK);

      await Location.startGeofencingAsync(GEOFENCE_TASK, [
        {
          identifier: "FriendZone",
          latitude: center.latitude,
          longitude: center.longitude,
          radius: FRIENDZONE_RADIUS_M,
          notifyOnEnter: true,
          notifyOnExit: true,
        },
      ]);

      setGeofencingActive(true);

      // 3) Zoom to show the zone
      if (mapRef.current) {
        mapRef.current.animateToRegion(
          {
            latitude: center.latitude,
            longitude: center.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
          600
        );
      }
    } catch (e) {
      console.log("FriendZone start error:", e);
      Alert.alert("Could not start FriendZone", String(e?.message ?? e));
    }
  };

  const stopFriendZone = async () => {
    try {
      const started = await Location.hasStartedGeofencingAsync(GEOFENCE_TASK);
      if (started) await Location.stopGeofencingAsync(GEOFENCE_TASK);
      setGeofencingActive(false);
      // If you want to hide the circle when stopped:
      // setGeofenceCenter(null);
    } catch (e) {
      console.log("FriendZone stop error:", e);
      Alert.alert("Could not stop FriendZone", String(e?.message ?? e));
    }
  };

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          ref={mapRef}
          style={styles.map}
          mapType="satellite"
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation
          showsMyLocationButton={false}
        >
          {/* Optional marker for user */}
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="You"
          />

          {/* FriendZone circle */}
          {geofenceCenter && (
            <Circle
              center={geofenceCenter}
              radius={FRIENDZONE_RADIUS_M}
              strokeWidth={2}
            />
          )}
        </MapView>
      ) : (
        <View style={styles.loading}>
          <Text>{errorMsg || "Waiting for location..."}</Text>
        </View>
      )}

      {/* FriendZone button = Geofence */}
      <Pressable
        style={[
          styles.buttonContainer,
          geofencingActive && styles.buttonActive,
        ]}
        onPress={geofencingActive ? stopFriendZone : startFriendZoneAtUser}
      >
        <Text style={styles.buttonText}>
          {geofencingActive ? "Stop FriendZone" : "FriendZone"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: "100%", height: "100%" },
  loading: { flex: 1, alignItems: "center", justifyContent: "center" },

  buttonContainer: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 100,
    borderColor: "blue",
    borderWidth: 2,
    backgroundColor: "rgba(255,255,255,0.95)",
  },
  buttonActive: {
    borderColor: "green",
  },
  buttonText: {
    fontWeight: "700",
  },
});