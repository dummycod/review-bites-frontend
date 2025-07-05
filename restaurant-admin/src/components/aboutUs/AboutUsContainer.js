import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import InfoItemInput from "./InfoItemInput";

const AboutUsContainer = ({ aboutUsData, setAboutUsData }) => {
  const cuisine = aboutUsData[0];

  const onCuisineTextChanged = (text) => {
    const temp = [...aboutUsData];
    temp[0] = text;
    setAboutUsData(temp);
  };

  const onAverageCostTextChanged = (text) => {
    const temp = [...aboutUsData];
    temp[1] = text;
    setAboutUsData(temp);
  };

  const onEstablishmentTypeTextChanged = (text) => {
    const temp = [...aboutUsData];
    temp[2] = text;
    setAboutUsData(temp);
  };

  const onHomeDeliveryTextChanged = (text) => {
    const temp = [...aboutUsData];
    temp[3] = text;
    setAboutUsData(temp);
  };

  return (
    <View style={styles.root}>
      <Text style={styles.heading}>About Us</Text>
      <View style={styles.inputContainer}>
        <InfoItemInput
          iconName={"food-bank"}
          heading={"CUISINE"}
          text={aboutUsData[0]}
          onTextChanged={onCuisineTextChanged}
        />
        <InfoItemInput
          iconName={"account-balance-wallet"}
          heading={"AVERAGE COST"}
          text={aboutUsData[1]}
          onTextChanged={onAverageCostTextChanged}
        />
        <InfoItemInput
          iconName={"apartment"}
          heading={"ESTABLISHMENT TYPE"}
          text={aboutUsData[2]}
          onTextChanged={onEstablishmentTypeTextChanged}
        />
        <InfoItemInput
          iconName={"home"}
          heading={"HOME DELIVERY"}
          text={aboutUsData[3]}
          onTextChanged={onHomeDeliveryTextChanged}
        />
      </View>
    </View>
  );
};

export default AboutUsContainer;

const styles = StyleSheet.create({
  heading: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 20,
    marginTop: 15,
    marginLeft: 15,
  },
  inputContainer: {
    alignItems: "center",
    marginTop: 15,
  },
});
