import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import Card from "../Card";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const ReviewItem = ({ userId, username, text, rating, onDelete }) => {
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
        <View style={styles.reviewHeader}>
          <Text style={styles.name}>{username}</Text>
          {
            <Pressable
              onPress={() => {
                onDelete(userId, text);
              }}
            >
              <MaterialIcons name="delete" size={24} color={"#000"} />
            </Pressable>
          }
        </View>
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
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
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
