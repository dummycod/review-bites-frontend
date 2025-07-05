import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Subheading = ({ children }) => {
  return (
    <View>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

export default Subheading;

const styles = StyleSheet.create({
  text: {
    fontFamily: "Montserrat_500Medium_Italic",
    textAlign: "center",
    fontSize: 16,
  },
});
