import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Platform } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

interface MapViewComponentProps {
  pickup?: { latitude: number; longitude: number; title?: string };
  destination?: { latitude: number; longitude: number; title?: string };
  driverLocation?: { latitude: number; longitude: number };
  style?: any;
}

export default function MapViewComponent({ 
  pickup, 
  destination, 
  driverLocation, 
  style 
}: MapViewComponentProps) {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const defaultRegion = {
    latitude: -25.4753, // Nelspruit coordinates
    longitude: 30.9694,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const currentRegion = location ? {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  } : defaultRegion;

  if (Platform.OS === 'web') {
    // Fallback for web - show a placeholder
    return (
      <View style={[styles.webMapPlaceholder, style]}>
        <View style={styles.webMapContent}>
          <View style={styles.webMapIcon} />
          <View style={styles.webMapText}>
            <View style={styles.webMapTitle} />
            <View style={styles.webMapSubtitle} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <MapView
      style={[styles.map, style]}
      provider={PROVIDER_GOOGLE}
      region={currentRegion}
      showsUserLocation={true}
      showsMyLocationButton={true}
      mapType="standard"
    >
      {pickup && (
        <Marker
          coordinate={pickup}
          title={pickup.title || "Pickup Location"}
          pinColor="green"
        />
      )}
      
      {destination && (
        <Marker
          coordinate={destination}
          title={destination.title || "Destination"}
          pinColor="red"
        />
      )}
      
      {driverLocation && (
        <Marker
          coordinate={driverLocation}
          title="Driver Location"
          pinColor="blue"
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  webMapPlaceholder: {
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  webMapContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  webMapIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#9CA3AF',
    borderRadius: 24,
    marginRight: 16,
  },
  webMapText: {
    flex: 1,
  },
  webMapTitle: {
    width: 120,
    height: 16,
    backgroundColor: '#9CA3AF',
    borderRadius: 8,
    marginBottom: 8,
  },
  webMapSubtitle: {
    width: 80,
    height: 12,
    backgroundColor: '#6B7280',
    borderRadius: 6,
  },
});