import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import Card from "../Card";
import MenuItem from "../MenuItem";

const data = [
  { key: "1", name: "Chai" },
  { key: "2", name: "Poha" },
  { key: "3", name: "Samosa" },
];

const BestMenuItems = () => {
  return (
    <Card style={styles.card}>
      <Text style={styles.heading}>Top 3 Picks</Text>
      <View style={styles.menuContainer}>
        <MenuItem name={data[0].name} />
        <MenuItem name={data[1].name} />
        <MenuItem name={data[2].name} />
      </View>
    </Card>
  );
};

export default BestMenuItems;

const styles = StyleSheet.create({
  card: {
    paddingBottom: 12,
    marginLeft: 14,
    marginRight: 14,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginTop: 16,
  },

  heading: {
    fontSize: 20,
    marginVertical: 8,
    fontFamily: "Montserrat_600SemiBold",
  },

  menuContainer: {
    paddingHorizontal: 16,
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
