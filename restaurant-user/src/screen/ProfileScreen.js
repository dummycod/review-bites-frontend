import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Alert,
  FlatList,
} from "react-native";
import React, { useLayoutEffect, useEffect, useState } from "react";
import ReviewCardHorizontal from "../components/ReviewCardHorizontal";
import Button from "../components/Button";
import ScreenWrapper from "../components/ScreenWrapper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useApi from "../hooks/useApi";
import Spinner from "react-native-loading-spinner-overlay/lib";

const ProfileScreen = ({ navigation, route }) => {
  const defaultImage = require("../../assets/images/profile.png");

  const [reviews, setReviews] = useState([]);

  const { data, error, setError, loading, fetchUrl, resetHookState } = useApi();

  const getUserReviews = () => {
    fetchUrl(`/user/get-user-reviews`, true, "get-reviews");
  };

  const { username, profileIcon } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Profile",
      headerShown: true,
    });
  }, [navigation]);

  useEffect(() => {
    getUserReviews();
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data);
      setReviews(data);
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

  return (
    <ScreenWrapper>
      <Spinner
        visible={loading}
        textStyle={styles.spinnerStyle}
        color={"#F6544C"}
        size={"large"}
        overlayColor={"#FFF"}
      />
      <View style={styles.root}>
        <Image
          source={
            profileIcon
              ? {
                  uri:
                    CONSTANTS.BASE_URL +
                    "/public/images/profile-images/" +
                    profileIcon,
                }
              : defaultImage
          }
          style={styles.image}
        />
        <Text style={styles.name}>{username}</Text>
        <Button
          text={"Logout"}
          style={{ width: "30%", marginTop: 30, backgroundColor: "#c91b1b" }}
          onclick={async () => {
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("id");
            navigation.replace("Welcome");
          }}
        />
        <Text style={styles.heading}>Your Reviews</Text>
        <View style={styles.container}>
          <FlatList
            data={reviews}
            renderItem={({ item, index }) => (
              <ReviewCardHorizontal
                restaurantName={item.restaurantName}
                rating={item.rating}
                reviewText={item.reviewText}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
  },
  image: {
    height: 130,
    width: 130,
    resizeMode: "cover",
    marginBottom: 13,
    marginTop: 20,
    borderRadius: 70,
    overflow: "hidden",
  },
  name: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 16,
  },
  heading: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 20,
    alignSelf: "flex-start",
    marginStart: 15,
    marginTop: 30,
  },

  container: {
    width: "100%",
    paddingHorizontal: 10,
    paddingTop: 15,
  },
});
