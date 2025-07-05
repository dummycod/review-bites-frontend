import { StyleSheet, Text, View } from "react-native";
import React from "react";

const AddressInput = () => {
  return (
    <View style={styles.root}>
      <Text style={styles.heading}>Address</Text>
      <Text style={styles.address}>Address</Text>
    </View>
  );
};

export default AddressInput;

const styles = StyleSheet.create({
  root: {
    width: "80%",
    position: "relative",
    borderWidth: 0.5,
    borderColor: "#bababa",
    borderRadius: 4,
    margin: 50,
    paddingVertical: 4,
    paddingHorizontal: 6,
    flexDirection: "column",
  },
  heading: {
    fontSize: 14,
    fontFamily: "Montserrat_600SemiBold",
  },

  address: {
    fontSize: 12,
    fontFamily: "Montserrat_500Medium",
  },
});
