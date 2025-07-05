import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Card from "../Card";
import MontserratText from "../MontserratText";
import InfoItem from "./InfoItem";

const AboutUs = ({ aboutUsData }) => {
  return (
    <Card style={styles.card}>
      <Text style={styles.heading}>{"About us"}</Text>
      <InfoItem
        iconName={"food-bank"}
        heading={"CUISINE"}
        text={aboutUsData.cuisine}
      />
      <InfoItem
        iconName={"account-balance-wallet"}
        heading={"AVERAGE COST"}
        text={aboutUsData.averageCost}
      />
      <InfoItem
        iconName={"apartment"}
        heading={"ESTABLISHMENT TYPE"}
        text={aboutUsData.establishmentType}
      />
      <InfoItem
        iconName={"home"}
        heading={"HOME DELIVERY"}
        text={aboutUsData.homeDelivery}
      />
    </Card>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  card: {
    paddingBottom: 12,
    marginLeft: 14,
    marginRight: 14,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginTop: 16,
    fontFamily: "Montserrat_600SemiBold",
  },

  heading: {
    fontSize: 20,
    marginVertical: 8,
    fontFamily: "Montserrat_600SemiBold",
  },
});
