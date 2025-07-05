import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const ImageCard = ({ id, label1, label2, heading, subheading, imageUrl }) => {
  const navigtaion = useNavigation();

  return (
    <Pressable
      onPress={() => {
        navigtaion.navigate("RestaurantDashboard", { restaurantId: id });
      }}
    >
      <View style={styles.root}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        {label1 !== "0.0" && (
          <Text style={styles.label1}>
            {" "}
            <FontAwesome name="star" size={12} color="white" /> {label1}
          </Text>
        )}

        <Text style={styles.label2}>{label2}</Text>
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.subheading}>{subheading}</Text>
      </View>
    </Pressable>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  root: {
    width: 250,
    height: 280,
    flexDirection: "column",
    borderRadius: 5,
    backgroundColor: "white",
    overflow: "hidden",
    marginRight: 20,
  },

  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },

  heading: {
    marginTop: 15,
    paddingHorizontal: 6,
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 15,
  },

  subheading: {
    marginTop: 4,
    paddingHorizontal: 6,
    fontFamily: "Montserrat_500Medium",
    fontSize: 12,
  },

  label1: {
    padding: 4,
    backgroundColor: "#69ac26",
    color: "#fff",
    fontFamily: "Montserrat_500Medium",
    fontSize: 12,
    textAlign: "center",
    borderRadius: 4,
    position: "absolute",
    bottom: 70,
    left: 10,
  },

  label2: {
    padding: 4,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "#fff",
    fontFamily: "Montserrat_500Medium",
    fontSize: 10,
    textAlign: "center",
    borderRadius: 4,
    position: "absolute",
    bottom: 90,
    right: 10,
  },
});
