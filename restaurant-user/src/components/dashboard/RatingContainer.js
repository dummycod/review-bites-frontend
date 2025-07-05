import { StyleSheet, Text, View } from "react-native";
import React from "react";

const RatingContainer = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

export default RatingContainer;

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#F6544C",
  },
  text: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 18,
    paddingHorizontal: 4,
  },
});
