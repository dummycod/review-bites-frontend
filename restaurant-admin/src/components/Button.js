import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

const Button = ({ text, onclick, style }) => {
  return (
    <Pressable style={{ ...styles.btn, ...style }} onPress={onclick}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    width: "80%",
    backgroundColor: "#F6544C",
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
