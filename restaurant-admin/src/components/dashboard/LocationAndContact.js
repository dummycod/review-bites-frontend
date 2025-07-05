import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Card from "../Card";
import MapView, { Marker } from "react-native-maps";

const LocationAndContact = ({ location }) => {
  const coordinates = {
    latitude: location.latitude,
    longitude: location.longitude,
  };

  return (
    <Card style={styles.card}>
      <Text style={styles.heading}>{"View on maps"}</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        }}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        scrollEnabled={false} // Disable panning
        zoomEnabled={false}
      >
        <Marker coordinate={coordinates} />
      </MapView>
    </Card>
  );
};

export default LocationAndContact;

const styles = StyleSheet.create({
  card: {
    paddingBottom: 12,
    marginLeft: 14,
    marginRight: 14,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginTop: 16,
  },

  heading: {
    fontSize: 20,
    marginVertical: 8,
    fontFamily: "Montserrat_600SemiBold",
  },

  map: {
    width: "100%",
    height: 200,
    marginTop: 6,
  },
});
