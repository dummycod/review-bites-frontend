import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Heading = ({ children }) => {
  return (
    <View>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
  text: {
    fontFamily: "Montserrat_600SemiBold",
    textAlign: "center",
    fontSize: 36,
    padding: 8,
  },
});
