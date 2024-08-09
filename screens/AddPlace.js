import PlaceForm from "../components/Places/PlaceForm";
import { WebView } from "react-native-webview";
import { Alert, View, StyleSheet, Image, Text } from "react-native";
import Constants from "expo-constants";

function AddPlace({ navigation, route }) {
  function createPlaceHandler(place) {
    navigation.navigate("AllPlaces", {
      place: place,
    });
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}

export default AddPlace;
const styles = StyleSheet.create({
  WebViewContainer: {
    flex: 1,
    marginTop: Constants.stwatusBarHeight,
  },
});
