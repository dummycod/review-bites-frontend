import { View, Text, Image, ScrollView, StyleSheet, Alert } from "react-native";
import React from "react";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import EditTextBox from "../components/EditTextBox";
import Button from "../components/Button";
import { useState, useEffect } from "react";
import useApi from "../hooks/useApi";
import Spinner from "react-native-loading-spinner-overlay";
import ScreenWrapper from "../components/ScreenWrapper";
import LottieView from "lottie-react-native";

const LoginScreen = ({ navigation }) => {
  const [contactNumber, setContactNumber] = useState(null);

  const { data, loading, error, fetchData, setError } = useApi();

  const sendOtpUrl = `/public/send-otp?type=login&contactNumber=${contactNumber}`;

  const sendOtpToPhoneNumber = async () => {
    fetchData(sendOtpUrl);
  };

  useEffect(() => {
    if (data) {
      console.log(data);
      navigation.replace("VerifyOtp", {
        contactNumber: contactNumber,
        type: "login",
      });
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
  }, [data, error, navigation]);

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
            source={require("../../assets/animations/food-critic.json")}
            style={{ width: 300, height: 380 }}
            autoPlay
            loop
          />
          <View
            style={{
              width: "100%",
              borderWidth: 0.5,
              borderColor: "#DFDFDF",
              marginBottom: 10,
            }}
          />
          <Heading>Login</Heading>
          <Subheading>And let's dish out your reviews!</Subheading>
          <View style={{ height: 30 }} />
          <EditTextBox
            name="Contact Number"
            onTextChange={(value) => {
              setContactNumber(value);
            }}
            keyboardType="numeric"
          />
          <View style={{ height: 10 }} />
          <Button
            text={"Send Verification Code"}
            onclick={sendOtpToPhoneNumber}
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  animationContainer: {
    height: 400,
  },
  image: {
    height: 400,
    flex: 1,
  },
});

export default LoginScreen;
