import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Card from "../Card";
import OfferItem from "../offers/OfferItem";
import { formatTimestampToDDMMMYYYY } from "../../utils/TimeUtility";

const OffersContainer = ({ offerList }) => {
  return (
    <Card style={styles.card}>
      <Text style={styles.heading}>{"Offers"}</Text>
      <View style={{ height: 10 }}></View>
      {offerList.map((item, index) => (
        <OfferItem
          backgroundColor={item.color}
          title={item.heading}
          description={item.description}
          validTill={formatTimestampToDDMMMYYYY(item.timestamp)}
          key={item}
        />
      ))}
    </Card>
  );
};

export default OffersContainer;

const styles = StyleSheet.create({
  card: {
    paddingBottom: 12,
    marginLeft: 14,
    marginRight: 14,
    borderRadius: 8,

    marginTop: 16,
  },

  heading: {
    fontSize: 20,
    marginVertical: 8,
    fontFamily: "Montserrat_600SemiBold",
    paddingHorizontal: 16,
  },
});
