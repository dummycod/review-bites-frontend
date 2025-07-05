import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Card from "../Card";

const ImageContainer = () => {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text>Images</Text>
        <Text>See all</Text>
      </View>
    </Card>
  );
};

export default ImageContainer;

const styles = StyleSheet.create({
  card: {
    width: "90%",
    height: 200,
    alignSelf: "center",
    marginTop: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
  },
});
