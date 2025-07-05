import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

const DetailsInput = ({
  heading,
  headingWidth,
  style,
  uneditable,
  text,
  textInputStyle,
  handleTextChange,
  numeric,
}) => {
  const onChangeText = handleTextChange ? handleTextChange : () => {};
  const editable = uneditable ? false : true;
  const defaultText = text ? text : "";
  return (
    <View style={{ ...styles.root, ...style }}>
      <Text style={{ ...styles.heading, maxWidth: headingWidth }}>
        {heading}
      </Text>
      <TextInput
        style={{ ...styles.input, ...textInputStyle }}
        multiline
        value={text}
        editable={editable}
        onChangeText={onChangeText}
        keyboardType={numeric ? "numeric" : "text"}
      />
    </View>
  );
};

export default DetailsInput;

const styles = StyleSheet.create({
  root: {
    position: "relative",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  heading: {
    flexWrap: "wrap",
    maxWidth: 135,
    position: "relative",
    top: -13.5,
    left: 8,
    backgroundColor: "#ffffff",
    fontFamily: "Montserrat_600SemiBold",
    textAlign: "center",
    color: "#000000",
    fontSize: 12,
  },
  input: {
    position: "relative",
    fontSize: 14,
    padding: 4,
    marginTop: -15,
    zIndex: 1,
    fontFamily: "Montserrat_500Medium",
  },
});
