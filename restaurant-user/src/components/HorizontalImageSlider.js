import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import React from "react";
import ImageCard from "./ImageCard";

const HorizontalImageSlider = ({ style, title, data, onViewAllClick }) => {
  return (
    <View style={{ ...styles.root, ...style }}>
      <View style={styles.header}>
        <Text style={styles.heading}>{title}</Text>
        <Pressable onPress={onViewAllClick}>
          <Text style={styles.link}>View All</Text>
        </Pressable>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ImageCard
            id={item.id}
            heading={item.heading}
            subheading={item.subheading}
            label1={item.label1}
            label2={item.label2}
            imageUrl={item.imageUrl}
          />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default HorizontalImageSlider;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  heading: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 18,
    alignSelf: "flex-end",
  },
  link: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 14,
    color: "#F6544C",
    alignSelf: "flex-end",
  },
});
