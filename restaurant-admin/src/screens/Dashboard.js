import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import React from "react";
import Header from "../components/dashboard/Header";
import {
  useCallback,
  useRef,
  useEffect,
  useState,
  useLayoutEffect,
} from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import LocationAndContact from "../components/dashboard/LocationAndContact";
import ScreenWrapper from "../components/ScreenWrapper";
import AboutUs from "../components/dashboard/AboutUs";
import OffersContainer from "../components/dashboard/OffersContainer";
import useApi from "../hooks/useApi";
import Spinner from "react-native-loading-spinner-overlay";
import CONSTANTS from "../context/constant";
import Contact from "../components/dashboard/Contact";

const Dashboard = ({ route }) => {
  const scrollViewRef = useRef(null);
  const { setImageUri, setRestaurantName } = route.params;

  const [headerData, setHeaderData] = useState({
    name: "Untitled",
    location: "N/A",
    opensAt: "00:00:00",
    closesAt: "00:00:00",
    hashtags: "",
  });

  const [location, setLocation] = useState({
    latitude: 0.0,
    longitude: 0.0,
    address: "N/",
  });

  const [aboutUsData, setAboutUsData] = useState({
    cuisine: "",
    averageCode: "",
    establishmentType: "",
    homeDelivery: "",
  });

  const [offerList, setOfferList] = useState([]);

  const [contacts, setContacts] = useState([null, null]);

  const { data, error, setError, loading, fetchUrl, resetHookState } = useApi();

  useEffect(() => {
    if (data) {
      updateDashboard(data);
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

  const updateDashboard = (data) => {
    const { hashtag1, hashtag2, hashtag3 } = data.additionalRestaurantDetails;
    const { cuisine, averageCost, establishmentType, homeDelivery } =
      data.additionalRestaurantDetails;
    setHeaderData({
      name: data.name,
      location: `${data.city}, ${data.state}`,
      opensAt: data.openingTime,
      closesAt: data.closingTime,
      hashtags: `${hashtag1 == null ? "" : hashtag1} ${
        hashtag2 == null ? "" : hashtag2
      } ${hashtag3 == null ? "" : hashtag3}`,
    });
    setLocation({
      latitude: data.latitude,
      longitude: data.longitude,
      address: data.address,
    });

    setContacts([data.contact_1, data.contact_2]);

    setRestaurantName(data.name);
    setImageUri(
      CONSTANTS.BASE_URL + "/public/images/restaurant-images/" + data.imageName
    );

    setAboutUsData({
      cuisine,
      averageCost,
      establishmentType,
      homeDelivery,
    });

    setOfferList(data.offerList);

    console.log(
      CONSTANTS.BASE_URL + "/public/images/restaurant-images/" + data.imageName
    );
  };

  useFocusEffect(
    useCallback(() => {
      route.params.setShowTopBar(false);
      scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: false });
      route.params.dashboardScreenScroll();
      const url = "/restaurant/dashboard";
      fetchUrl(url, true, "get-dashboard-data");
    }, [scrollViewRef, route.params.dashboardScreenScroll])
  );

  handleScroll = (event) => {
    route.params.handleScroll(event);
  };

  return (
    <ScreenWrapper>
      <ScrollView
        ref={scrollViewRef}
        scrollEventThrottle={16}
        onScroll={handleScroll}
      >
        {loading ? (
          <Spinner
            visible={loading}
            textStyle={styles.spinnerStyle}
            color={"#F6544C"}
            overlayColor={"#fff"}
            size={"large"}
          />
        ) : (
          <View>
            <Header headerData={headerData} />
            {offerList.length > 0 && <OffersContainer offerList={offerList} />}
            <LocationAndContact location={location} />
            <AboutUs aboutUsData={aboutUsData} />
            <Contact contact1={contacts[0]} contact2={contacts[1]} />
            <View style={{ height: 50 }}></View>
          </View>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
