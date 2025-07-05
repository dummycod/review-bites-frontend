import { StyleSheet, Text, View, Image, AppState } from "react-native";
import React, { useEffect } from "react";
import ButtonBlack from "../components/ButtonBlack";
import useGetLocation from "../hooks/useGetLocation";
import ScreenWrapper from "../components/ScreenWrapper";

const LocationScreen = ({ navigation }) => {
  const {
    location,
    address,
    cityAndRegion,
    locationError,
    openLocationSettings,
    setLocationError,
    getCurrentLocation,
  } = useGetLocation();

  useEffect(() => {
    if (location != null) {
      navigation.navigate("UserDashboard", { location });
      console.log(
        "Coodinates: " + location.latitude + " " + location.longitude
      );
    }
  }, [location]);

  return (
    <ScreenWrapper>
      <View style={styles.root}>
        <Text style={styles.text}>Please Enable Location to Continue</Text>
        <Image
          source={require("../../assets/images/location.png")}
          style={styles.image}
        />
        <ButtonBlack
          text={"Enable Location"}
          onclick={() => {
            getCurrentLocation();
          }}
        />
      </View>
    </ScreenWrapper>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginVertical: 40,
  },
  text: {
    textAlign: "center",
    fontSize: 22,
    fontFamily: "Montserrat_600SemiBold",
    marginTop: 10,
  },
});
