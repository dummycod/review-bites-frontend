import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const ReviewCardHorizontal = ({ restaurantName, rating, reviewText }) => {
  const repeatComponent = (Component, times) => {
    return Array.from({ length: times }, (_, index) => (
      <Component key={index} />
    ));
  };

  const SolidStar = () => (
    <FontAwesome style={styles.icon} name="star" size={20} color="#69ac26" />
  );

  const OutlineStar = () => (
    <FontAwesome style={styles.icon} name="star-o" size={20} color="#69ac26" />
  );

  return (
    <View style={styles.root}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 10,
        }}
      >
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.heading}>{restaurantName}</Text>
          <View style={styles.starContainer}>
            {repeatComponent(SolidStar, rating)}
            {repeatComponent(OutlineStar, 5 - rating)}
          </View>
          <Text style={styles.subheading}>{reviewText}</Text>
        </View>
      </View>
    </View>
  );
};

export default ReviewCardHorizontal;

const styles = StyleSheet.create({
  root: {
    width: "100%",
    paddingVertical: 20,
    flexDirection: "column",
    borderRadius: 5,
    backgroundColor: "white",
    overflow: "hidden",
    marginRight: 20,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },

  heading: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 18,
  },

  subheading: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 14,
    color: "#000000",
  },

  starContainer: {
    flexDirection: "row",
    marginVertical: 8,
  },
});
