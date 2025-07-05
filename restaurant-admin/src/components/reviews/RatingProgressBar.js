import { StyleSheet, Text, View } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";

const RatingProgressBar = ({ name, progress }) => {
  return (
    <View style={styles.root}>
      <Text style={styles.label}>{name}</Text>
      <View style={styles.bar}>
        <Progress.Bar
          progress={progress}
          width={220}
          color={"#69ac26"}
          unfilledColor="#eeeeee"
          borderColor="#eeeeee"
        />
      </View>
      <Text style={styles.percent}>100%</Text>
    </View>
  );
};

export default RatingProgressBar;

const styles = StyleSheet.create({
  root: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    marginTop: 8,
  },
  label: {
    width: 65,
    fontFamily: "Montserrat_400Regular",
    textAlign: "start",
    fontSize: 12,
    color: "#535353",
  },
  bar: {
    marginRight: 10,
  },
  percent: {
    width: 65,
    fontFamily: "Montserrat_400Regular",
    fontSize: 12,
    color: "#535353",
  },
});
