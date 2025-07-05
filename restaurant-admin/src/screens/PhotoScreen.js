import { StyleSheet, FlatList, Image, View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import useApi from "../hooks/useApi";
import Spinner from "react-native-loading-spinner-overlay/lib";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScreenWrapper from "../components/ScreenWrapper";

const PhotoScreen = () => {
  const { data, loading, error, setError, fetchUrl } = useApi();

  const [imageList, setImageList] = useState();

  useEffect(() => {
    if (data) {
      console.log(data);
      setImageList(data);
    }
  }, [data, error]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const restaurant_id = await AsyncStorage.getItem("restaurantId");
      fetchUrl(
        "/public/get-restaurant-images?restaurant_id=" + restaurant_id,
        ""
      );
    };
    fetchPhotos();
  }, []);

  const renderItem = ({ item, index }) => (
    <Image
      source={{
        uri: CONSTANTS.BASE_URL + "/public/images/restaurant-images/" + item,
      }}
      style={styles.image}
    />
  );

  return (
    <ScreenWrapper>
      <View>
        <Spinner
          visible={loading}
          textStyle={styles.spinnerStyle}
          color={"#F6544C"}
          size={"large"}
        />
        <Text style={styles.heading}>Photos</Text>
        <FlatList
          data={imageList}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 60 }}
        />
      </View>
    </ScreenWrapper>
  );
};

export default PhotoScreen;

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    padding: 10,
    paddingTop: 20,
    fontFamily: "Montserrat_600SemiBold",
    backgroundColor: "#fff",
    elevation: 1,
  },
  image: {
    width: "95%",
    height: 250,
    marginVertical: 12,
    borderRadius: 14,
    alignSelf: "center",
  },
});
