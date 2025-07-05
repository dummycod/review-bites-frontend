import { View, Text, Image, ScrollView, StyleSheet, Alert } from "react-native";
import React from "react";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import EditTextBox from "../components/EditTextBox";
import Button from "../components/Button";
import useApi from "../hooks/useApi";
import { useState, useEffect } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import ScreenWrapper from "../components/ScreenWrapper";
import LottieView from "lottie-react-native";

const LoginScreen = ({ navigation }) => {
  const { data, loading, error, fetchData, setError } = useApi();

  const [email, setEmail] = useState(null);

  const sendOtpUrl = `/public/send-otp-to-email?type=login&email=${email}`;

  const sendOtpToEmail = async () => {
    fetchData(sendOtpUrl);
  };

  useEffect(() => {
    if (data) {
      navigation.replace("VerifyOtp", { email: email, type: "login" });
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
            source={require("../../assets/animations/review.json")}
            style={{ width: 300, height: 380 }}
            autoPlay
            loop={false}
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
          <Subheading>Hear what others got to say!</Subheading>
          <View style={{ height: 30 }} />
          <EditTextBox
            name="Email"
            onTextChange={(value) => {
              setEmail(value);
            }}
            keyboardType="numeric"
          />
          <View style={{ height: 10 }} />
          <Button text={"Send Verification Code"} onclick={sendOtpToEmail} />
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

export default LoginScreen;
