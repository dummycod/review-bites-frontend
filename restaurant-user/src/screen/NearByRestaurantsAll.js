import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Alert,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import SearchItem from "../components/search/SearchItem";
import ScreenWrapper from "../components/ScreenWrapper";
import Spinner from "react-native-loading-spinner-overlay";

const NearByRestaurantsAll = ({ navigation, route }) => {
  const { nearByRestaurants } = route.params;

  console.log(nearByRestaurants);

  return (
    <ScreenWrapper>
      <View style={{ flex: 1 }}>
        <Text style={styles.heading}>Restaurants Near you</Text>
        <View style={styles.searchResults}>
          <FlatList
            data={nearByRestaurants}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <SearchItem
                id={item.id}
                name={item.heading}
                imageUrl={item.imageUrl}
                address={item.subheading}
                onClick={() => {
                  navigation.navigate("RestaurantDashboard", {
                    restaurantId: item.id,
                  });
                }}
              />
            )}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default NearByRestaurantsAll;

const styles = StyleSheet.create({
  searchBox: {
    width: "90%",
    marginTop: 20,
    alignSelf: "center",
  },

  image: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginTop: "65%",
  },

  heading: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 18,
    marginTop: 25,
    marginHorizontal: 20,
  },
  searchResults: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
  },
});
