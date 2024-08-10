import { useCallback, useLayoutEffect, useState, useRef, useEffect } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import IconButton from '../components/UI/IconButton';
import MapView, { Marker } from 'react-native-maps';
import { useRoute, useIsFocused } from '@react-navigation/native';
import ViewShot from 'react-native-view-shot';
import useUserLocation from '../hooks/useUserLocation';
import Button from '../components/UI/Button';

function Map({ navigation }) {
  const route = useRoute();
  const viewShotRef = useRef();
  const { getCurrentLocation } = useUserLocation();
  const [selectedLocation, setSelectedLocation] = useState(route?.params?.pickedLocation);
  const mapRef = useRef();
  function selectLocationHandler(event) {
    const lat = event?.nativeEvent?.coordinate?.latitude;
    const lng = event?.nativeEvent?.coordinate?.longitude;

    setSelectedLocation({ lat: lat, lng: lng });
  }
  async function selectCurrentUserLocationHandler() {
    const location = await getCurrentLocation();
    const currnet = {
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    };
    location && setSelectedLocation(currnet);
  }

  const savePickedLocationHandler = useCallback(async () => {
    if (!selectedLocation) {
      Alert.alert(
        'No location picked!',
        'You have to pick a location (by tapping on the map) first!'
      );
      return;
    }
    viewShotRef.current.capture().then((uri) => {
      navigation.navigate('AddPlace', {
        pickedLat: selectedLocation.lat,
        pickedLng: selectedLocation.lng,
        locationSnapShot: uri,
      });
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton icon="save" size={20} color={tintColor} onPress={savePickedLocationHandler} />
      ),
    });
  }, [navigation, savePickedLocationHandler]);

  useEffect(() => {
    mapRef.current.animateToRegion({
      latitude: selectedLocation?.lat || 37.78,
      longitude: selectedLocation?.lng || -122.43,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    });
  }, [selectedLocation]);

  return (
    <ViewShot style={{ flex: 1 }} ref={viewShotRef}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: selectedLocation?.lat || 37.78,
          longitude: selectedLocation?.lng || -122.43,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        onPress={selectLocationHandler}
      >
        {selectedLocation && (
          <Marker
            draggable={true}
            isPreselected={true}
            title="Picked Location"
            coordinate={{
              latitude: selectedLocation?.lat || 37.78,
              longitude: selectedLocation?.lng || -122.43,
            }}
          />
        )}
      </MapView>
      <View style={styles.currentUserLocationBtn}>
        <Button icon="location" onPress={selectCurrentUserLocationHandler}>
          Pick current Location
        </Button>
      </View>
    </ViewShot>
  );
}

export default Map;
const styles = StyleSheet.create({
  currentUserLocationBtn: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
});
