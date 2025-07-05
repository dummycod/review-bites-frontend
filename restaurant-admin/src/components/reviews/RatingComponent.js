import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import RatingProgressBar from "./RatingProgressBar";

const RatingComponent = ({ reviewArray, onDeleteReview }) => {
  const repeatComponent = (Component, times) => {
    return Array.from({ length: times }, (_, index) => (
      <Component key={index} />
    ));
  };

  const SolidStar = () => (
    <FontAwesome style={styles.icon} name="star" size={32} color="#69ac26" />
  );

  const OutlineStar = () => (
    <FontAwesome style={styles.icon} name="star-o" size={32} color="#69ac26" />
  );

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) {
      const averageRating = 0;
      return averageRating.toFixed(1);
    }

    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    return averageRating.toFixed(1);
  };

  const calculateRatingAverages = (reviews) => {
    const totalReviews = reviews.length;
    const ratingCounts = Array(5).fill(0);

    if (totalReviews === 0) return ratingCounts;

    reviews.forEach((review) => {
      ratingCounts[review.rating - 1]++;
    });

    return ratingCounts;
  };

  const totalRating = calculateAverageRating(reviewArray);
  const ratingAverages = calculateRatingAverages(reviewArray);

  return (
    <View style={styles.root}>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{totalRating}</Text>
        <View style={styles.starContainer}>
          {repeatComponent(SolidStar, totalRating)}
          {repeatComponent(OutlineStar, 5 - totalRating)}
        </View>
        <View style={{ height: 50 }} />
        <RatingProgressBar name={"Excellent"} progress={ratingAverages[4]} />
        <RatingProgressBar name={"Good"} progress={ratingAverages[3]} />
        <RatingProgressBar name={"Average"} progress={ratingAverages[2]} />
        <RatingProgressBar name={"Bad"} progress={ratingAverages[1]} />
        <RatingProgressBar name={"Poor"} progress={ratingAverages[0]} />
      </View>
      <Text style={{ ...styles.heading }}>
        All Reviews ({reviewArray.length})
      </Text>
    </View>
  );
};

export default RatingComponent;

const styles = StyleSheet.create({
  ratingContainer: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 48,
  },
  reviewContainer: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
    paddingVertical: 25,
  },
  starContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  rating: {
    fontSize: 60,
    fontFamily: "Montserrat_600SemiBold",
  },
  icon: {
    marginRight: 6,
  },

  heading: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 24,
    marginTop: 20,
    marginBottom: 12,
    marginLeft: 14,
    alignSelf: "flex-start",
  },

  ratingText: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 15,
    textAlign: "center",
  },

  reviewText: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 18,
    textAlign: "center",
    marginTop: 10,
  },

  reviewBtn: {
    width: "40%",
    marginTop: 12,
    marginStart: 20,
    backgroundColor: "#000",
  },

  reviewEditBox: {
    width: "90%",
    alignSelf: "center",
  },

  reviewHeader: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});
