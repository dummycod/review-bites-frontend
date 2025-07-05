import { StyleSheet, Text, View } from "react-native";
import React from "react";

const StatusBar = ({ name }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
    </View>
  );
};

export default StatusBar;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#ffffff",
    paddingVertical: 18,
    paddingHorizontal: 16,
    position: "relative",
    zIndex: 1,
  },
  title: {
    fontFamily: "Montserrat_600SemiBold",
    color: "#000",
    fontSize: 18,
  },
});
