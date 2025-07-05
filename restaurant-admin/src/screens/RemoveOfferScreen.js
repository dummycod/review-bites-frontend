import { StyleSheet, Text, View, Alert, Image } from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import useApi from "../hooks/useApi";
import Spinner from "react-native-loading-spinner-overlay/lib";
import OfferItem from "../components/offers/OfferItem";
import { formatTimestampToDDMMMYYYY } from "../utils/TimeUtility";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScreenWrapper from "../components/ScreenWrapper";

const RemoveOfferScreen = ({ navigation }) => {
  const [offerList, setOfferList] = useState([]);

  const {
    data,
    error,
    loading,
    setError,
    fetchUrl,
    fetchData,
    resetHookState,
  } = useApi();

  var restaurant_id = -1;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Remove Offer",
      headerShown: true,
    });
  }, [navigation]);

  const fetchOffers = async () => {
    restaurant_id = await AsyncStorage.getItem("restaurantId");
    fetchUrl("/public/get-offers?restaurant_id=" + restaurant_id, false, "get");
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  useEffect(() => {
    if (data) {
      if (data.requestCode === "get") {
        setOfferList(data.offers);
        resetHookState();
      } else {
        onOfferDeleted();
      }
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

  const onOfferDeleted = () => {
    resetHookState();
    fetchOffers();
  };

  const deleteOffer = (offerId) => {
    fetchData(
      "/restaurant/delete-offer?offerId=" + offerId,
      true,
      null,
      null,
      "delete"
    );
  };

  const NoOfferView = () => (
    <View style={{ marginTop: "60%" }}>
      <Image
        style={styles.notFound}
        source={require("../../assets/images/offer.png")}
      />
      <Text
        style={{
          alignSelf: "center",
          fontSize: 18,
          fontFamily: "Montserrat_600SemiBold",
          marginTop: 18,
        }}
      >
        No Offers Found
      </Text>
    </View>
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

        <View style={{ height: 30 }} />
        {offerList.length === 0 ? (
          <NoOfferView />
        ) : (
          offerList.map((item, index) => (
            <OfferItem
              id={item.id}
              backgroundColor={item.color}
              title={item.heading}
              description={item.description}
              validTill={formatTimestampToDDMMMYYYY(item.timestamp)}
              key={index}
              onDelete={deleteOffer}
            />
          ))
        )}
      </View>
    </ScreenWrapper>
  );
};

export default RemoveOfferScreen;

const styles = StyleSheet.create({
  notFound: {
    width: 150,
    height: 150,
    alignSelf: "center",
    resizeMode: "contain",
  },
});
