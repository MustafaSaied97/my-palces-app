import { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';

import { Colors } from '@/constants/colors';
import OutlinedButton from '@/components/UI/OutlinedButton';

function LocationPicker({ onPickLocation }) {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();

  const [pickedLocation, setPickedLocation] = useState();
  const [locationPreview, setLocationPreview] = useState(null);

  function pickLocationHandler() {
    navigation.navigate('Map', {
      pickedLocation: pickedLocation,
    });
  }

  useEffect(() => {
    if (!isFocused || !route.params) return;

    setPickedLocation({
      lat: route.params.pickedLat,
      lng: route.params.pickedLng,
    });
    setLocationPreview(route.params.locationSnapShot);
  }, [route, isFocused]);

  useEffect(() => {
    (async () => {
      if (pickedLocation) {
        onPickLocation({ ...pickedLocation });
      }
    })();
  }, [pickedLocation, onPickLocation]);

  return (
    <View>
      <View style={styles.mapPreview}>
        {locationPreview ? (
          <Image style={styles.image} source={{ uri: locationPreview }} />
        ) : (
          <Text>No location picked yet.</Text>
        )}
      </View>
      <View style={styles.actions}>
        <OutlinedButton icon="map" onPress={pickLocationHandler}>
          Pick Location
        </OutlinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  WebViewContainer: {
    flexDirection: 'row',
    flex: 1,
    height: 1000,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  link: {
    color: Colors.primary700,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#000',
  },
});
