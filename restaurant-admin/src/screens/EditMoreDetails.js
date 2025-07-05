import { StyleSheet, View, ScrollView, Alert } from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import TagsContainer from "../components/aboutUs/TagsContainer";
import AboutUsContainer from "../components/aboutUs/AboutUsContainer";
import Button from "../components/Button";
import useApi from "../hooks/useApi";
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScreenWrapper from "../components/ScreenWrapper";

const EditMoreDetails = ({ navigation, settings }) => {
  const {
    data,
    loading,
    error,
    setError,
    fetchUrl,
    fetchData,
    resetHookState,
  } = useApi();

  const [tags, setTags] = useState([]);
  const [aboutUsData, setAboutUsData] = useState(["", "", "", ""]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Edit Details",
      headerShown: true,
    });
  }, [navigation]);

  useEffect(() => {
    if (data) {
      if (data.requestCode === "get-details") {
        fillDetails(data);
      } else if (data.requestCode === "updated") {
      } else {
        getDetails();
      }

      resetHookState();
    }
    if (error) {
      Alert.alert("Error", error, [
        {
          text: "ok",
          onPress: () => {
            setError(null);
          },
        },
      ]);
    }
  }, [data, error]);

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    const restaurantId = await AsyncStorage.getItem("restaurantId");
    fetchUrl(
      "/public/more-details?restaurant_id=" + restaurantId,
      false,
      "get-details"
    );
  };

  const saveAdditionalDetails = () => {
    const hashtag1 = tags[0];
    const hashtag2 = tags[1];
    const hashtag3 = tags[2];

    const cuisine = aboutUsData[0];
    const averageCost = aboutUsData[1];
    const establishmentType = aboutUsData[2];
    const homeDelivery = aboutUsData[3];

    const requestBody = {
      hashtag1,
      hashtag2,
      hashtag3,
      cuisine,
      averageCost,
      establishmentType,
      homeDelivery,
    };
    console.log(requestBody);

    fetchData(
      "/restaurant/update-more-details",
      true,
      requestBody,
      null,
      "updated"
    );
  };

  const fillDetails = (data) => {
    const { hashtag1, hashtag2, hashtag3 } = data;
    const hashtags = [hashtag1, hashtag2, hashtag3];
    setTags(hashtags.filter((value) => value !== null));
    const { cuisine, averageCost, establishmentType, homeDelivery } = data;
    setAboutUsData([cuisine, averageCost, establishmentType, homeDelivery]);
  };

  return (
    <ScreenWrapper>
      <ScrollView>
        <Spinner
          visible={loading}
          textStyle={styles.spinnerStyle}
          color={"#F6544C"}
          size={"large"}
        />
        <View style={{ height: 10 }} />
        <TagsContainer tags={tags} setTags={setTags} />
        <View style={{ height: 25 }} />
        <AboutUsContainer
          aboutUsData={aboutUsData}
          setAboutUsData={setAboutUsData}
        />
        <Button
          text={"Save"}
          style={{ marginVertical: 30, alignSelf: "center" }}
          onclick={saveAdditionalDetails}
        />
      </ScrollView>
    </ScreenWrapper>
  );
};

export default EditMoreDetails;

const styles = StyleSheet.create({});
