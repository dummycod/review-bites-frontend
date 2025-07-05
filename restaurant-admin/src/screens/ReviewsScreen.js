import { Alert, FlatList } from "react-native";
import React, { useCallback, useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import ReviewItem from "../components/reviews/ReviewItem";
import RatingComponent from "../components/reviews/RatingComponent";
import ScreenWrapper from "../components/ScreenWrapper";
import useApi from "../hooks/useApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay/lib";

const ReviewsScreen = ({ route }) => {
  const [reviews, setReviews] = useState([]);

  const { data, error, setError, loading, fetchUrl, resetHookState } = useApi();

  const loadReviews = async () => {
    const restaurantId = await AsyncStorage.getItem("restaurantId");

    fetchUrl(
      `/public/get-all-reviews?restaurantId=${restaurantId}`,
      false,
      "get-all"
    );
  };

  const deleteReview = (userId, reviewText) => {
    console.log(reviewText);
    Alert.alert(
      "Confirm",
      "Are you sure you want to delete review?\n\n" + reviewText,
      [
        {
          text: "Yes",
          onPress: () => {
            fetchUrl(
              `/restaurant/delete-review?userId=${userId}`,
              true,
              "delete-review"
            );
          },
        },
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    if (data) {
      const { requestCode } = data;
      switch (requestCode) {
        case "get-all":
          setReviews(data);
          break;

        case "delete-review":
          loadReviews();
          break;
      }
      resetHookState();
    }
    if (error) {
      Alert.alert("Error", error, [
        {
          text: "ok",
          onPress: () => {
            setError(null);
            resetHookState();
          },
        },
      ]);
    }
  }, [data, error]);

  useFocusEffect(
    useCallback(() => {
      route.params.setShowTopBar(true);
      route.params.nonDashboardScreenScroll();
      loadReviews();
    }, [route.params.nonDashboardScreenScroll])
  );
  return (
    <ScreenWrapper>
      <Spinner
        visible={loading}
        color={"#F6544C"}
        size={"large"}
        overlayColor={"#FFF"}
      />
      {!loading && reviews && (
        <FlatList
          data={reviews}
          renderItem={({ item, index }) => (
            <ReviewItem
              userId={item.userId}
              username={item.username}
              text={item.reviewText}
              rating={item.rating}
              onDelete={deleteReview}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={() => <RatingComponent reviewArray={reviews} />}
        />
      )}
    </ScreenWrapper>
  );
};

export default ReviewsScreen;
