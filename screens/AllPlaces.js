import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/colors';
import PlaceItem from '@/components/Places/PlaceItem';

function AllPlaces({ route }) {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    route?.params?.place && setPlaces((curPlaces) => [...curPlaces, route.params.place]);
  }, [route?.params]);

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No places added yet - start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem place={item} />}
    />
  );
}

export default AllPlaces;
const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
