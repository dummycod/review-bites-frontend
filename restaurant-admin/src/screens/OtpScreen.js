import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
  BackHandler,
} from "react-native";
import React from "react";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import OtpContainer from "../components/otpscreen/OtpContainer";
import Button from "../components/Button";
import Spinner from "react-native-loading-spinner-overlay";
import { useState, useEffect } from "react";
import useApi from "../hooks/useApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import ScreenWrapper from "../components/ScreenWrapper";

const OtpScreen = ({ route, navigation }) => {
  const { data, error, loading, fetchData, setError } = useApi();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const { email, type } = route.params;

  const verifyOtpUrl = `/public/verify-email-otp?email=${email}&otp=${otp.join(
    ""
  )}`;

  const verifyOtp = () => {
    fetchData(verifyOtpUrl);
  };

  useEffect(() => {
    const handleData = async () => {
      if (data) {
        if (type === "registeration") {
          navigation.replace("BasicDetailsScreen", {
            email: email,
          });
        } else {
          await AsyncStorage.setItem("token", data.token);
          await AsyncStorage.setItem(
            "restaurantId",
            data.restaurantId.toString()
          );

          navigation.replace("DashboardNavigation");
        }
      }

      if (error) {
        Alert.alert("Error", error, [
          {
            text: "ok",
            onPress: () => {
              setError(null);
              setOtp(["", "", "", "", "", ""]);
            },
          },
        ]);
      }
    };

    handleData();
  });

  return (
    <ScreenWrapper>
      <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <Spinner
          visible={loading}
          textStyle={styles.spinnerStyle}
          color={"#F6544C"}
          size={"large"}
        />
        <View style={styles.container}>
          <LottieView
            source={require("../../assets/animations/mail.json")}
            style={{ width: 300, height: 380 }}
            autoPlay
          />
          <View
            style={{
              width: "100%",
              borderWidth: 0.5,
              borderColor: "#DFDFDF",
              marginBottom: 10,
            }}
          />
          <Heading>Verify Otp</Heading>
          <Subheading>Code dispatched to {email}</Subheading>
          <View style={{ height: 30 }} />
          <OtpContainer name="Code" otp={otp} setOtp={setOtp} />
          <View style={{ height: 10 }} />
          <Button text={"Verify"} onclick={verifyOtp} />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  image: {
    height: 400,
    resizeMode: "repeat",
  },
});

export default OtpScreen;
