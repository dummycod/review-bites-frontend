import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const InfoItem = ({ iconName, heading, text }) => {
  return (
    <View style={styles.root}>
      <MaterialIcons
        style={styles.infoIcon}
        name={iconName}
        size={26}
        color="#F6544C"
      />
      <View style={styles.infoTextContainer}>
        <Text style={styles.infoHeading}>{heading}</Text>
        {text && text.length > 0 ? (
          <Text style={styles.info}>{text}</Text>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

export default InfoItem;

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    marginVertical: 8,
  },
  infoIcon: {
    marginRight: 14,
    marginTop: 4,
  },
  infoTextContainer: {},
  infoHeading: {
    fontSize: 14,
    color: "#000",
    fontFamily: "Montserrat_500Medium",
    marginTop: 6,
  },
  info: {
    fontSize: 12,
    color: "#272727",
    marginTop: 4,
    fontFamily: "Montserrat_400Regular",
  },
});
