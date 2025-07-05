import { StyleSheet, View, ScrollView, ToastAndroid } from "react-native";
import React, { useState, useEffect } from "react";
import TagsContainer from "../components/aboutUs/TagsContainer";
import AboutUsContainer from "../components/aboutUs/AboutUsContainer";
import Button from "../components/Button";
import useApi from "../hooks/useApi";
import Spinner from "react-native-loading-spinner-overlay";
import ScreenWrapper from "../components/ScreenWrapper";

const MoreDetails = ({ navigation }) => {
  const { data, loading, error, setError, fetchData, fetchUrl } = useApi();

  const [tags, setTags] = useState([]);
  const [aboutUsData, setAboutUsData] = useState(["", "", "", ""]);

  useEffect(() => {
    if (data) {
      navigation.replace("Manage Photos");
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
    fetchData("/restaurant/add-more-details", true, requestBody, null, "");
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

export default MoreDetails;

const styles = StyleSheet.create({});
