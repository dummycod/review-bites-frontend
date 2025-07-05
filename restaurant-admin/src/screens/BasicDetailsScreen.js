import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import DetailsInput from "../components/basicDetails/DetailsInput";
import DateTimePicker from "@react-native-community/datetimepicker";
import LocationButton from "../components/basicDetails/LocationButton";
import Button from "../components/Button";
import useGetLocation from "../hooks/useGetLocation";
import useApi from "../hooks/useApi";
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScreenWrapper from "../components/ScreenWrapper";

const BasicDetailsScreen = ({ route, navigation, updateDetails }) => {
  const { email } = route.params;

  const { data, error, loading, fetchData, setError } = useApi();

  const registerApiUrl = "/public/register-restaurant";

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Enter Details",
      headerShown: true,
    });
  }, [navigation]);

  const [name, setName] = useState("");
  const [contact1, setContact1] = useState("");
  const [contact2, setContact2] = useState("");

  const [userAddress, setUserAddress] = useState("");

  const [opensAt, setOpensAt] = useState(new Date());
  const [closesAt, setClosesAt] = useState(new Date());

  const [showOpensAtTimePicker, setShowOpensAtTimePicker] = useState(false);
  const [showClosesAtTimePicker, setShowClosesAtTimePicker] = useState(false);

  const [opensAtStr, setOpensAtStr] = useState("N/A");
  const [closesAtStr, setClosesAtStr] = useState("N/A");

  console.log(opensAtStr);

  const registerRestaurant = async () => {
    const body = {
      name: name,
      address: userAddress,
      city: city,
      state: region,
      email: email,
      contact_1: contact1,
      contact_2: contact2,
      openingTime: convertTimeToHHMMSS(opensAt),
      closingTime: convertTimeToHHMMSS(closesAt),
      latitude: location.latitude,
      longitude: location.longitude,
    };

    console.log(body);

    fetchData(registerApiUrl, false, body);
  };

  const {
    location,
    address,
    cityAndRegion,
    locationError,
    setLocationError,
    getCurrentLocation,
  } = useGetLocation();

  useEffect(() => {
    setUserAddress(address);
  }, [address]);

  const { city, region } = cityAndRegion;
  console.log(city + " " + region);

  const selectionMargin = 30;

  if (locationError) {
    Alert.alert("Error", locationError, [
      {
        text: "Ok",
        onPress: () => {
          setLocationError(null);
        },
        style: "cancel",
      },
    ]);
  }

  const onOpensAtChange = (event, selectedDate) => {
    const currentDate = selectedDate || opensAt;
    setShowOpensAtTimePicker(false);
    setOpensAt(currentDate);
    setOpensAtStr(
      currentDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    );
  };

  const onClosesAtChange = (event, selectedDate) => {
    const currentDate = selectedDate || closesAt;
    setShowClosesAtTimePicker(false);
    setClosesAt(currentDate);
    setClosesAtStr(
      currentDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    );
  };

  useEffect(() => {
    const handleData = async () => {
      if (data) {
        await AsyncStorage.setItem("token", data.token);
        await AsyncStorage.setItem("restaurantId", data.id.toString());
        navigation.replace("MoreDetails");
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
    };
    handleData();
  }, [data, error]);

  return (
    <ScreenWrapper>
      <ScrollView
        style={styles.root}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spinner
          visible={loading}
          textStyle={styles.spinnerStyle}
          color={"#F6544C"}
          size={"large"}
        />
        <DetailsInput
          heading={"Restaurant Name"}
          headingWidth={120}
          style={{ width: "80%", marginTop: selectionMargin }}
          text={name}
          handleTextChange={(v) => setName(v)}
        />

        <DetailsInput
          heading={"Contact Number 1"}
          headingWidth={120}
          height={200}
          style={{ width: "80%", marginTop: selectionMargin }}
          text={contact1}
          handleTextChange={(v) => setContact1(v)}
          numeric={true}
        />

        <DetailsInput
          heading={"Contact Number 2"}
          headingWidth={120}
          height={200}
          style={{ width: "80%", marginTop: 20 }}
          text={contact2}
          handleTextChange={(v) => setContact2(v)}
          numeric={true}
        />

        <DetailsInput
          heading={"Address"}
          headingWidth={55}
          height={200}
          style={{ width: "80%", marginTop: selectionMargin }}
          text={userAddress}
          handleTextChange={(v) => setUserAddress(v)}
        />

        <View style={styles.latAndlong}>
          <DetailsInput
            heading={"Latitude"}
            headingWidth={55}
            height={80}
            text={location ? location.latitude.toString() : ""}
            uneditable
          />
          <DetailsInput
            heading={"Longitude"}
            headingWidth={68}
            height={80}
            style={{ marginTop: 20 }}
            text={location ? location.longitude.toString() : ""}
            uneditable
          />
          <LocationButton
            style={{ marginTop: 10 }}
            onClick={getCurrentLocation}
          />
        </View>

        <View style={styles.timeContainer}>
          <Pressable
            onPress={() => {
              setShowOpensAtTimePicker(true);
            }}
            style={{ width: "40%" }}
          >
            <DetailsInput
              heading={"Opens At"}
              headingWidth={65}
              height={200}
              style={{ width: "100%" }}
              textInputStyle={{ textAlign: "center" }}
              uneditable
              text={opensAtStr}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              setShowClosesAtTimePicker(true);
            }}
            style={{ width: "40%" }}
          >
            <DetailsInput
              heading={"Closes At"}
              headingWidth={65}
              height={200}
              style={{ width: "100%" }}
              textInputStyle={{ textAlign: "center" }}
              text={closesAtStr}
              uneditable
            />
          </Pressable>
        </View>
        {showOpensAtTimePicker && (
          <DateTimePicker
            mode="time"
            is24Hour={false}
            display="spinner"
            value={opensAt}
            onChange={onOpensAtChange}
          />
        )}

        {showClosesAtTimePicker && (
          <DateTimePicker
            mode="time"
            is24Hour={false}
            display="spinner"
            value={closesAt}
            onChange={onClosesAtChange}
          />
        )}
        <Button
          text={"Save Details"}
          style={{ width: "70%", marginTop: 50 }}
          onclick={registerRestaurant}
        />
      </ScrollView>
    </ScreenWrapper>
  );
};

function convertTimeToHHMMSS(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(
    seconds
  )}`;

  return formattedTime;
}

function padZero(number) {
  return number < 10 ? `0${number}` : number;
}

export default BasicDetailsScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  timeContainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
  },

  latAndlong: {
    width: "80%",
    flexDirection: "column",
    marginTop: 20,
  },
});
