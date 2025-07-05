import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const LocationButton = ({ style, onClick }) => {
  return (
    <TouchableOpacity style={{ ...styles.root, ...style }} onPress={onClick}>
      <MaterialIcons name="my-location" size={24} color="#fff" />
      <Text style={styles.text}>Use Current Location</Text>
    </TouchableOpacity>
  );
};

export default LocationButton;

const styles = StyleSheet.create({
  root: {
    width: "75%",
    borderColor: "#bababa",
    borderRadius: 6,
    paddingHorizontal: 4,
    paddingVertical: 10,
    elevation: 1,
    backgroundColor: "#F6544C",
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
  },
  text: {
    fontSize: 14,
    padding: 4,
    fontFamily: "Montserrat_500Medium",
    color: "#fff",
    marginStart: 10,
  },
});
