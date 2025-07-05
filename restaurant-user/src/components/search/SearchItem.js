import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import Card from "../Card";

const SearchItem = ({ onClick, name, address, imageName, imageUrl }) => {
  console.log(
    CONSTANTS.BASE_URL + "/public/images/restaurant-images/" + imageName
  );
  return (
    <Pressable onPress={onClick}>
      <Card style={styles.root}>
        <View>
          <Text style={styles.text}>{name}</Text>
          <Text style={styles.subtext}>{address}</Text>
        </View>
        {imageUrl ? (
          <Image style={styles.restaurantImage} source={{ uri: imageUrl }} />
        ) : (
          <Image
            style={styles.restaurantImage}
            source={{
              uri:
                CONSTANTS.BASE_URL +
                "/public/images/restaurant-images/" +
                imageName,
            }}
          />
        )}
      </Card>
    </Pressable>
  );
};

export default SearchItem;

const styles = StyleSheet.create({
  root: {
    width: "100%",
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 5,
  },
  restaurantImage: {
    width: 140,
    height: 100,
    resizeMode: "cover",
  },
  text: {
    fontSize: 14,
    fontFamily: "Montserrat_600SemiBold",
  },
  subtext: {
    fontSize: 12,
    fontFamily: "Montserrat_600SemiBold",
    color: "#a0a0a0",
    marginTop: 6,
  },
});
