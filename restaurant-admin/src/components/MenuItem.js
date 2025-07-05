import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const MenuItem = ({ name, image }) => {
  return (
    <View>
      <Image
        source={require("../../assets/images/chai.png")}
        style={styles.image}
      />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
  },

  name: {
    textAlign: "center",
    marginTop: 3,
    fontFamily: "Montserrat_400Regular",
  },
});
