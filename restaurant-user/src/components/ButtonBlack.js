import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

const ButtonBlack = ({ text, onclick, style }) => {
  return (
    <Pressable style={{ ...styles.btn, ...style }} onPress={onclick}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default ButtonBlack;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#000",
    paddingHorizontal: 10,
    paddingVertical: 14,
    borderRadius: 5,
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Montserrat_600SemiBold",
  },
});
