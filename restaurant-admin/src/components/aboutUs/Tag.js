import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";

const Tag = ({ text, onTagSelected, onTagRemoved, isTagSelected }) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(isTagSelected);
  }, [isTagSelected]);

  const toggleState = () => {
    setSelected((prevState) => {
      if (prevState) {
        onTagRemoved(text);
      } else {
        if (!onTagSelected(text)) return;
      }
      return !prevState;
    });
  };

  return (
    <Pressable onPress={toggleState}>
      <View
        style={{
          ...styles.root,
          ...(selected ? styles.selected : styles.unselected),
        }}
      >
        <Text
          style={{
            ...styles.text,
            ...(selected ? styles.selectedText : styles.unselectedText),
          }}
        >
          {text}
        </Text>
      </View>
    </Pressable>
  );
};

export default Tag;

const styles = StyleSheet.create({
  root: {
    backgroundColor: "red",
    alignSelf: "flex-start",
    paddingHorizontal: 6,
    paddingVertical: 10,
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 4,
  },
  text: {
    color: "#ffffff",
    fontFamily: "Montserrat_500Medium",
    fontSize: 12,
  },
  selected: {
    backgroundColor: "#F6544C",
  },
  selectedText: {
    color: "#ffffff",
  },
  unselected: {
    backgroundColor: "#cecece",
  },
  unselectedText: {
    color: "#000000",
  },
});
