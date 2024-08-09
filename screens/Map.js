import { useCallback, useLayoutEffect, useState, useRef, useEffect } from 'react';
import { Alert, StyleSheet } from 'react-native';
import IconButton from '../components/UI/IconButton';
import MapView, { Marker } from 'react-native-maps';
import { useRoute, useIsFocused } from '@react-navigation/native';
import ViewShot from 'react-native-view-shot';
import useUserLocation from '../hooks/useUserLocation';

function Map({ navigation }) {
  const isFocused = useIsFocused();

  const route = useRoute();
  const viewShotRef = useRef();
  const { getCurrentLocation } = useUserLocation();

  const [selectedLocation, setSelectedLocation] = useState();

  function selectLocationHandler(event) {
    const lat = event?.nativeEvent?.coordinate?.latitude;
    const lng = event?.nativeEvent?.coordinate?.longitude;

    setSelectedLocation({ lat: lat, lng: lng });
  }

  const savePickedLocationHandler = useCallback(() => {
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
        <IconButton icon="save" size={24} color={tintColor} onPress={savePickedLocationHandler} />
      ),
    });
    (async function () {
      const location = await getCurrentLocation();
      const currnet = {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      };
      const pickedLocation = route?.params?.pickedLocation || currnet;
      console.log('pickedLocation', pickedLocation);

      // setSelectedLocation(pickedLocation);
    })();
  }, [navigation, savePickedLocationHandler]);
  useEffect(() => {
    console.log('selectedLocation', selectedLocation);
  }, [selectedLocation]);
  return (
    <ViewShot style={{ flex: 1 }} ref={viewShotRef}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: selectedLocation?.lat || 37.78,
          longitude: selectedLocation?.lng || -122.43,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={selectLocationHandler}
      >
        {selectedLocation && (
          <Marker
            draggable={false}
            title="Picked Location"
            coordinate={{
              latitude: selectedLocation?.lat,
              longitude: selectedLocation?.lng,
            }}
          />
        )}
      </MapView>
    </ViewShot>
  );
}

export default Map;

// const styles = StyleSheet.create({
//   map: {
//     flex: 1,
//   },
// });
