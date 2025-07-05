import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import RatingProgressBar from "./RatingProgressBar";
import ReviewEditBox from "./ReviewEditBox";
import Button from "../Button";
import { MaterialIcons } from "@expo/vector-icons";

const RatingComponent = ({
  reviewArray,
  onPostReview,
  userId,
  onDeleteReview,
}) => {
  const [userRating, setUserRating] = useState(5);
  const ratingText = ["Poor", "Bad", "Average", "Good", "Excellent"];
  const emojis = ["😓", "😣", "😬", "😄", "❤"];
  const [reviewText, setReviewText] = useState("");

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
      return 0;
    }

    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    return averageRating.toFixed(1);
  };

  const calculateRatingAverages = (reviews) => {
    const totalReviews = reviews.length;
    const ratingCounts = Array(5).fill(0); // Assuming ratings are between 1 and 5

    if (totalReviews === 0) return ratingCounts;

    reviews.forEach((review) => {
      ratingCounts[review.rating - 1]++;
    });

    const ratingAverages = ratingCounts.map((count) =>
      Math.floor(count / totalReviews)
    );

    return ratingCounts;
  };

  const handlePress = (index, type) => {
    setUserRating(index + 1);
  };

  const totalRating = calculateAverageRating(reviewArray);
  const ratingAverages = calculateRatingAverages(reviewArray);
  const userRatingStars = [
    ...repeatComponent(SolidStar, userRating),
    ...repeatComponent(OutlineStar, 5 - userRating),
  ];
  const myReview = reviewArray.find((review) => review.userId == userId);

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
      {myReview && (
        <View style={styles.reviewContainer}>
          <View style={styles.reviewHeader}>
            <Text style={styles.heading}>Your Review</Text>
            <Pressable onPress={onDeleteReview}>
              <MaterialIcons name="delete" size={30} color={"#cc4848"} />
            </Pressable>
          </View>
          <View style={styles.starContainer}>
            {repeatComponent(SolidStar, myReview.rating)}
            {repeatComponent(OutlineStar, 5 - myReview.rating)}
          </View>
          <Text style={styles.reviewText}>{myReview.reviewText}</Text>
        </View>
      )}
      {userId && !myReview && (
        <View style={styles.reviewContainer}>
          <Text style={styles.heading}>Rate the bites!</Text>
          <View
            style={{
              ...styles.starContainer,
              justifyContent: "center",
              marginTop: 30,
              marginBottom: 16,
            }}
          >
            {userRatingStars.map((ChildComponent, index) => (
              <Pressable key={index} onPress={() => handlePress(index)}>
                {ChildComponent}
              </Pressable>
            ))}
          </View>
          <Text style={styles.ratingText}>
            {userRating >= 0 &&
              "" + ratingText[userRating - 1] + " " + emojis[userRating - 1]}
          </Text>
          <ReviewEditBox
            style={styles.reviewEditBox}
            onChangeText={(text) => {
              setReviewText(text);
            }}
          />
          <Button
            text={"Post Review"}
            style={styles.reviewBtn}
            onclick={() => {
              onPostReview(reviewText, userRating);
            }}
          />
        </View>
      )}
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
