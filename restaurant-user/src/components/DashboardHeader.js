import React from "react";
import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ButtonBlack from "./ButtonBlack";

const DashboardHeader = ({
  onProfileIconClick,
  categoryName,
  categoryImageUrl,
  profileIcon,
  searchHashtag,
}) => {
  const defaultImage = require("../../assets/images/profile.png");

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#F6544C", "#FFCA37"]}
        start={[0, 0.5]}
        end={[1, 1.5]}
        style={styles.gradient}
      >
        <Pressable
          style={styles.profileIconContainer}
          onPress={onProfileIconClick}
        >
          <Image
            style={styles.profileIcon}
            source={
              profileIcon
                ? {
                    uri:
                      CONSTANTS.BASE_URL +
                      "/public/images/profile-images/" +
                      profileIcon,
                  }
                : defaultImage
            }
          />
        </Pressable>
        <Text style={styles.heading}>{`#${categoryName}`}</Text>

        <Image style={styles.image} source={{ uri: categoryImageUrl }} />

        <ButtonBlack
          style={styles.btn}
          text="Explore Now!"
          onclick={searchHashtag}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gradient: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },

  profileIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 50,
    alignSelf: "flex-end",
    marginEnd: 15,
    marginTop: 20,
    backgroundColor: "#FFF",
  },

  profileIcon: {
    width: "100%",
    height: "100%",
    borderRadius: 70,
    overflow: "hidden",
  },

  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  image: {
    width: 180,
    height: 140,
    alignSelf: "center",
    marginTop: 20,
    resizeMode: "contain",
  },

  heading: {
    color: "#fff",
    textAlign: "center",
    fontSize: 22,
    fontFamily: "Montserrat_600SemiBold",
    marginTop: 18,
  },

  btn: {
    width: 170,
    alignSelf: "center",
    marginTop: 20,
  },
});

export default DashboardHeader;
