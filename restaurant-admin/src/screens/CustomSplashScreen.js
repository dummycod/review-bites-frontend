import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";

const CustomSplashScreen = () => {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/splash.png")}
          style={styles.image}
        />
        <Text style={styles.text}>Welcome to MyApp</Text>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
});

export default CustomSplashScreen;
