import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const ReviewEditBox = ({ style, textInputStyle, editable, onChangeText }) => {
  return (
    <View style={{ ...styles.root, ...style }}>
      <FontAwesome name="pencil" size={24} color="#bababa" />
      <TextInput
        style={{ ...styles.input, ...textInputStyle }}
        multiline
        editable={editable}
        numberOfLines={5}
        onChangeText={onChangeText}
        placeholder={"Write Here.."}
      />
    </View>
  );
};

export default ReviewEditBox;

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#bababa",
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
  },
  input: {
    position: "relative",
    width: "90%",
    fontSize: 14,
    padding: 6,
    marginStart: 4,
    fontFamily: "Montserrat_500Medium",
  },
});
