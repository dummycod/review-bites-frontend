import { View, ScrollView, StyleSheet } from "react-native";
import React from "react";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import Button from "../components/Button";
import ScreenWrapper from "../components/ScreenWrapper";
import LottieView from "lottie-react-native";

const WelcomeScreen = ({ navigation }) => {
  return (
    <ScreenWrapper>
      <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <View style={styles.container}>
          <LottieView
            source={require("../../assets/animations/chef.json")}
            style={{ width: 380, height: 400, marginTop: 30 }}
            autoPlay
            loop={false}
          />

          <Heading>ReviewBite Admin</Heading>
          <Subheading>Chew on the truth!</Subheading>
          <View style={{ height: 70 }} />

          <Button
            text={"Register"}
            onclick={() => {
              navigation.navigate("Register");
            }}
          />

          <View style={{ height: 20 }} />
          <Button
            text={"Login"}
            onclick={() => {
              navigation.navigate("Login");
            }}
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

export default WelcomeScreen;
