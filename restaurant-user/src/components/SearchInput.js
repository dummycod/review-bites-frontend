import { StyleSheet, View, TextInput, Pressable, Alert } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const SearchInput = ({
  style,
  uneditable,
  text,
  textInputStyle,
  handleTextChange,
  onclick,
}) => {
  const onChangeText = handleTextChange ? handleTextChange : () => {};
  const editable = uneditable ? false : true;

  return (
    <Pressable style={{ ...styles.root, ...style }} onPress={onclick}>
      <FontAwesome name="search" size={24} color="#bababa" />
      <TextInput
        style={{ ...styles.input, ...textInputStyle }}
        multiline
        value={text}
        editable={editable}
        onChangeText={onChangeText}
        placeholder={"Search"}
      />
    </Pressable>
  );
};

export default SearchInput;

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
    padding: 4,
    marginStart: 4,
    fontFamily: "Montserrat_500Medium",
  },
});
