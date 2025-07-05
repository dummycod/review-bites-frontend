import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import React from "react";

const EditTextBox = ({ name, style, onTextChange }) => {
  return (
    <View style={styles.parentContainer}>
      <View style={styles.container}>
        <Text style={styles.name}>{name}</Text>
        <TextInput style={styles.input} onChangeText={onTextChange} />
      </View>
    </View>
  );
};

export default EditTextBox;

const styles = StyleSheet.create({
  parentContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  container: {
    width: "100%",
  },

  name: {
    fontSize: 13,
    fontFamily: "Montserrat_600SemiBold",
  },

  input: {
    fontFamily: "Montserrat_500Medium",
    height: 60,
    borderColor: "#000",
    borderWidth: 1.5,
    borderRadius: 5,
    fontSize: 18,
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
});
