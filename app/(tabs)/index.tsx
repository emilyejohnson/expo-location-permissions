import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const mapRef = useRef(null); // Ref to control the MapView

  useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }

          let currentLocation = await Location.getCurrentPositionAsync({});
          setLocation(currentLocation);
        })();
      }, []);

      const goToMyLocation = () => {
        if (location && mapRef.current) {
          mapRef.current.animateCamera({
            center: {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
            pitch: 0,
            heading: 0,
            altitude: 1000,
            zoom: 15,
          });
        }
      };
      return (
        <View style={styles.container}>
          {location ? (
            <MapView
              ref={mapRef}
              style={styles.map}
              mapType="satellite" // Set mapType to 'satellite' for satellite view
              initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              showsUserLocation={true} // Shows the blue dot for user's location
            >
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                title="You are here"
              />
            </MapView>
          ) : (
            <Text>{errorMsg || 'Waiting for location...'}</Text>
          )}
          <View style={styles.buttonContainer}>
            <Button title="FriendZone Button" onPress={goToMyLocation} />
          </View>
        </View>
      );
    }

     const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      map: {
        width: '100%',
        height: '100%',
      },
      buttonContainer: {
        position: 'absolute',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
      },
    });
