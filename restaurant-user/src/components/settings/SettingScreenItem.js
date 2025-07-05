import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const SettingScreenItem = ({ item, navigateToScreen, redBold }) => {
  console.log(item + " " + redBold);
  return (
    <TouchableNativeFeedback onPress={() => navigateToScreen(item.screenName)}>
      <View style={styles.root}>
        <Text
          style={[
            styles.text,
            redBold && {
              color: "#c91b1b",
              fontFamily: "Montserrat_600SemiBold",
            },
          ]}
        >
          {item.name}
        </Text>
        <AntDesign name="right" size={24} color="#282828" />
      </View>
    </TouchableNativeFeedback>
  );
};

export default SettingScreenItem;

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#ffffff",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 14,
  },
});
