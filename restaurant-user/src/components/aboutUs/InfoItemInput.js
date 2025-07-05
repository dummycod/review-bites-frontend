import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";

const InfoItemInput = ({ iconName, heading, text, onTextChanged }) => {
  return (
    <View style={styles.root}>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <MaterialIcons
          style={styles.infoIcon}
          name={iconName}
          size={26}
          color="#F6544C"
        />
        <Text style={styles.heading}>{heading}</Text>
      </View>
      <TextInput
        style={styles.textInput}
        value={text}
        onChangeText={onTextChanged}
      />
    </View>
  );
};

export default InfoItemInput;

const styles = StyleSheet.create({
  root: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 15,
  },
  heading: {
    width: 150,
    marginLeft: 10,
    alignSelf: "center",
    fontFamily: "Montserrat_600SemiBold",
  },
  infoIcon: {
    alignSelf: "center",
  },
  textInput: {
    width: 170,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#aeaeaeae",
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontFamily: "Montserrat_500Medium",
    //elevation: 1,
  },
});
