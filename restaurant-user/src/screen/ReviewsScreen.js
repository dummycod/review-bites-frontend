import { StyleSheet, FlatList, Alert } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import ReviewItem from "../components/reviews/ReviewItem";
import RatingComponent from "../components/reviews/RatingComponent";
import ScreenWrapper from "../components/ScreenWrapper";
import useApi from "../hooks/useApi";
import Spinner from "react-native-loading-spinner-overlay/lib";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ReviewsScreen = ({ route }) => {
  const { restaurantId } = route.params;

  const [reviews, setReviews] = useState([]);
  const [userId, setUserId] = useState(null);

  const {
    data,
    error,
    setLoading,
    setError,
    loading,
    fetchUrl,
    resetHookState,
    fetchData,
  } = useApi();

  const loadReviews = () => {
    fetchUrl(
      `/public/get-all-reviews?restaurantId=${restaurantId}`,
      false,
      "get-all"
    );
  };

  const postReview = (reviewText, rating) => {
    fetchData(
      `/user/add-review?restaurantId=${restaurantId}&reviewText=${reviewText}&rating=${rating}`,
      true,
      {},
      "application/json",
      "post-review"
    );
  };

  const deleteReview = () => {
    Alert.alert(
      "Confirm",
      "Are you sure you want to delete your review?",
      [
        {
          text: "Yes",
          onPress: () => {
            fetchUrl(
              "/user/delete-review?restaurantId=" + restaurantId,
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

  const showReviewPostedAlert = () => {
    Alert.alert("Thank you", "Your review was posted successfully", [
      {
        text: "ok",
        onPress: () => {
          resetHookState();
          loadReviews();
        },
      },
    ]);
  };

  const showDeletedAlert = () => {
    Alert.alert("Success", "Your review was deleted successfully", [
      {
        text: "ok",
        onPress: () => {
          resetHookState();
          loadReviews();
        },
      },
    ]);
  };

  useFocusEffect(
    useCallback(() => {
      route.params.setShowTopBar(true);
      route.params.nonDashboardScreenScroll();
      setLoading(true);
      loadReviews();
    }, [route.params.nonDashboardScreenScroll])
  );

  useEffect(() => {
    if (data) {
      const { requestCode } = data;
      switch (requestCode) {
        case "get-all":
          setReviews(data);
          resetHookState();
          break;

        case "post-review":
          showReviewPostedAlert();
          break;

        case "delete-review":
          showDeletedAlert();
          break;
      }
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

  useEffect(() => {
    async function initUserId() {
      const id = await AsyncStorage.getItem("userId");
      setUserId(id);
      console.log(id);
    }

    initUserId();
  }, []);

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
              username={item.username}
              text={item.reviewText}
              rating={item.rating}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={() => (
            <RatingComponent
              reviewArray={reviews}
              onPostReview={postReview}
              onDeleteReview={deleteReview}
              userId={1}
            />
          )}
        />
      )}
    </ScreenWrapper>
  );
};

export default ReviewsScreen;

const styles = StyleSheet.create({
  starContainer: {
    flexDirection: "row",
  },
});
