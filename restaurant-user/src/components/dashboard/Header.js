import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Card from "../Card";
import { convertToAMPM, isCurrentTimeBetween } from "../../utils/TimeUtility";

const Header = ({ headerData }) => {
  console.log(headerData);

  const { name, location, opensAt, closesAt, hashtags } = headerData;

  var opensAtText = "Opens At " + convertToAMPM(opensAt);
  var closesAtText = "Closes At " + convertToAMPM(closesAt);

  const isOpen = isCurrentTimeBetween(opensAt, closesAt);

  if (isOpen) {
    opensAtText = "Open Now";
  } else {
    closesAtText = "Closed";
  }

  return (
    <Card style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.location}>{location}</Text>
      <Text style={styles.tags}>{hashtags}</Text>
      <View style={styles.timingContainer}>
        <Text style={isOpen ? styles.isOpen : styles.timeText}>
          {opensAtText}
        </Text>
        <Text
          style={
            isOpen ? { ...styles.timeText, marginLeft: 16 } : styles.isClosed
          }
        >
          {closesAtText}
        </Text>
      </View>
    </Card>
  );
};

export default Header;

const styles = StyleSheet.create({
  card: {
    height: 130,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingHorizontal: 12,
  },
  name: {
    fontSize: 22,
    marginTop: 5,
    fontFamily: "Montserrat_700Bold",
  },
  location: {
    fontSize: 12,
    fontFamily: "Montserrat_400Regular",
    color: "#272727",
    marginTop: 4,
  },
  tags: {
    fontSize: 12,
    fontFamily: "Montserrat_400Regular",
    color: "#0644ca",
    marginTop: 4,
  },

  isOpen: {
    fontSize: 12,
    fontFamily: "Montserrat_400Regular",
    color: "#39b129",
  },

  isClosed: {
    fontSize: 12,
    fontFamily: "Montserrat_400Regular",
    color: "#b12929",
    marginLeft: 16,
  },

  timeText: {
    fontSize: 12,
    fontFamily: "Montserrat_400Regular",
    color: "#272727",
  },

  timingContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
});
