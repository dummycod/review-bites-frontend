import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Tag from "./Tag";

const TagsContainer = ({ tags, setTags }) => {
  const restaurantTags = [
    "#PunjabiPlatter",
    "#DelhiDelicacies",
    "#LucknowiFlavors",
    "#KarnatakaKuisine",
    "#TamilNaduTreats",
    "#KeralaKitchen",
    "#SichuanSavor",
    "#CantoneseCravings",
    "#HunanHeat",
    "#PunjabiParatha",
    "#MaharashtrianMaida",
    "#KeralaKulcha",
  ];

  console.log(tags);

  const isTagSelected = (tag) => {
    return tags.includes(tag);
  };

  const onTagSelected = (tag) => {
    if (tags.length == 3) {
      return false;
    } else {
      setTags((prev) => [...tags, tag]);
      return true;
    }
  };

  const onTagRemoved = (tag) => {
    setTags((prev) => prev.filter((current) => current != tag));
  };

  return (
    <View>
      <Text style={styles.heading}>Tags</Text>
      <View style={styles.tagContainer}>
        {restaurantTags.map((tag, index) => (
          <Tag
            key={index}
            text={tag}
            onTagSelected={onTagSelected}
            onTagRemoved={onTagRemoved}
            isTagSelected={isTagSelected(tag)}
            limit={3}
          />
        ))}
      </View>
      <Text style={styles.note}>
        Select any{" "}
        <Text style={{ fontFamily: "Montserrat_600SemiBold" }}>Three</Text>
      </Text>
    </View>
  );
};

export default TagsContainer;

const styles = StyleSheet.create({
  heading: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 20,
    marginTop: 15,
    marginLeft: 15,
  },
  tagContainer: {
    marginTop: 20,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
  },
  note: {
    fontFamily: "Montserrat_400Regular",
    alignSelf: "center",
    marginVertical: 15,
  },
});
