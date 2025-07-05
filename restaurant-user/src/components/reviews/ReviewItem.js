import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Card from "../Card";
import { FontAwesome } from "@expo/vector-icons";

const ReviewItem = ({ username, text, rating }) => {
  console.log(username);

  const repeatComponent = (Component, times) => {
    return Array.from({ length: times }, (_, index) => (
      <Component key={index} />
    ));
  };

  const SolidStar = () => (
    <FontAwesome name="star" style={styles.star} size={18} color="#F6544C" />
  );

  const OutlineStar = () => (
    <FontAwesome name="star-o" style={styles.star} size={18} color="#F6544C" />
  );

  return (
    <Card style={styles.card}>
      <View>
        <Text style={styles.name}>{username}</Text>
        <View style={styles.starContainer}>
          {repeatComponent(SolidStar, rating)}
          {repeatComponent(OutlineStar, 5 - rating)}
        </View>
        <Text style={styles.reviewText}>{text}</Text>
      </View>
    </Card>
  );
};

export default ReviewItem;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 14,
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderRadius: 8,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontFamily: "Montserrat_600SemiBold",
    marginVertical: 4,
  },
  reviewText: {
    marginTop: 15,
    fontSize: 13,
    fontFamily: "Montserrat_400Regular",
  },
  starContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  star: {
    marginEnd: 3,
  },
});
