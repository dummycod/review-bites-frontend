import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  RefreshControl,
} from "react-native";
import SearchInput from "../components/SearchInput";
import React, { useState, useEffect, useCallback } from "react";
import HorizontalImageSlider from "../components/HorizontalImageSlider";
import DashboardHeader from "../components/DashboardHeader";
import useApi from "../hooks/useApi";
import CONSTANTS from "../context/constant";
import Spinner from "react-native-loading-spinner-overlay";
import useGetLocation from "../hooks/useGetLocation";
import ScreenWrapper from "../components/ScreenWrapper";
import { useFocusEffect } from "@react-navigation/native";

const UserDashboard = ({ navigation, route }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [locationLoading, setLocationLoading] = useState(true);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setLocationLoading(true);
      getCurrentLocation();
      setRefreshing(false);
    }, 500);
  }, []);

  const {
    data,
    error,
    loading,
    fetchUrl,
    setError,
    setLoading,
    resetHookState,
  } = useApi();
  const { location, locationError, getCurrentLocation } = useGetLocation();

  const [dashboardData, setDashboardData] = useState({
    username: "",
    imageName: "",
    bannerHashtag: "",
    bannerHashtagImage: "",
    trendingRestaurants: [],
    nearByRestaurants: [],
  });

  useFocusEffect(
    useCallback(() => {
      setLocationLoading(true);
      setLoading(true);
      getCurrentLocation();
    }, [])
  );

  useEffect(() => {
    setLocationLoading(false);
  }, [dashboardData]);

  useEffect(() => {
    if (location !== null) {
      fetchDashboardData(location);
    }
  }, [location]);

  const fetchDashboardData = (loc) => {
    fetchUrl(
      "/user/user-dashboard-data?latitude=" +
        loc.latitude +
        "&longitude=" +
        loc.longitude,
      true
    );
  };

  useEffect(() => {
    if (locationError) {
      setLocationLoading(false);
      console.log(locationError);
      navigation.replace("LocationError");
    }
  }, [locationError]);

  useEffect(() => {
    if (data) {
      const convertData = (data) => {
        return data.map((item) => {
          return {
            id: item.restaurantId,
            heading: item.name,
            subheading: item.address,
            label1: parseFloat(item.rating).toFixed(1),
            label2: item.distance,
            imageUrl:
              CONSTANTS.BASE_URL +
              "/public/images/restaurant-images/" +
              item.dashboardPhoto,
          };
        });
      };

      const { username, imageName, bannerHashtag, bannerHashtagImage } = data;
      const nearByRestaurants = convertData(data.nearby);
      const trendingRestaurants = convertData(data.trending);

      setDashboardData({
        username,
        imageName,
        bannerHashtag,
        bannerHashtagImage,
        nearByRestaurants,
        trendingRestaurants,
      });

      resetHookState();
    }

    if (error) {
      navigation.navigate("Welcome");

      /*Alert.alert("Error", error, [
        {
          text: "ok",
          onPress: () => {
            setError(error);
          },
        },
      ]);*/
    }
  }, [data, error]);

  const onInputClicked = () => {
    navigation.navigate("Search");
  };

  const onProfileClick = () => {
    navigation.navigate("Profile", {
      username: dashboardData.username,
      profileIcon: dashboardData.imageName,
    });
  };

  const searchHashtag = () => {
    navigation.navigate("HashtagSearch", {
      hashtag: dashboardData.bannerHashtag,
    });
  };

  const onViewAllNearByRestaurants = () => {
    navigation.navigate("NearByRestaurants", {
      nearByRestaurants: dashboardData.nearByRestaurants,
    });
  };

  const onViewTrendingRestaurants = () => {
    navigation.navigate("TrendingRestaurants", {
      trendingRestaurants: dashboardData.trendingRestaurants,
    });
  };

  return (
    <ScreenWrapper>
      <Spinner
        visible={loading || locationLoading}
        textStyle={styles.spinnerStyle}
        color={"#F6544C"}
        size={"large"}
        overlayColor={"#FFFFFF"}
      />
      {!loading && !locationLoading && (
        <ScrollView
          contentContainerStyle={{ ...styles.root }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.header}>
            <DashboardHeader
              onProfileIconClick={onProfileClick}
              profileIcon={dashboardData.imageName}
              categoryName={dashboardData.bannerHashtag}
              categoryImageUrl={
                CONSTANTS.BASE_URL +
                "/public/images/hashtag-images/" +
                dashboardData.bannerHashtagImage
              }
              searchHashtag={searchHashtag}
            />
          </View>
          <SearchInput
            style={styles.searchBox}
            uneditable
            onclick={onInputClicked}
          />
          <HorizontalImageSlider
            style={styles.sliderSection}
            title={"Restaurants near you"}
            data={dashboardData.nearByRestaurants.slice(0, 5)}
            onViewAllClick={onViewAllNearByRestaurants}
          />
          <HorizontalImageSlider
            style={styles.sliderSection}
            title={"Trending Restaurants"}
            data={dashboardData.trendingRestaurants.slice(0, 5)}
            onViewAllClick={onViewTrendingRestaurants}
          />
        </ScrollView>
      )}
    </ScreenWrapper>
  );
};

export default UserDashboard;

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
  },

  header: {
    width: "100%",
    height: 380,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    overflow: "hidden",
  },

  searchBox: {
    width: "90%",
    marginTop: 20,
  },

  sliderSection: {
    width: "90%",
    marginTop: 20,
  },
});
