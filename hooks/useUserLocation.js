import React, { useEffect } from 'react';
import { getCurrentPositionAsync, useForegroundPermissions } from 'expo-location';

export default function useUserLocation() {
  const [locationPermission, requestLocationPermission] = useForegroundPermissions();
  async function verifyPermissions() {
    if (!locationPermission?.granted) {
      const permissionResponse = await requestLocationPermission();
      return permissionResponse.granted;
    }
    return true;
  }
  async function getCurrentLocation() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;

    const location = await getCurrentPositionAsync();
    return location;
  }
  return {
    getCurrentLocation,
  };
}
