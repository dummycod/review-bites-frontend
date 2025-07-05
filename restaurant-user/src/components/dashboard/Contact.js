import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Card from "../Card";
import InfoItem from "./InfoItem";

const Contact = ({ contact1, contact2 }) => {
  return (
    <Card style={styles.card}>
      <Text style={styles.heading}>{"Contact Info"}</Text>
      <InfoItem iconName={"local-phone"} heading={"+91" + contact1} text={""} />
      <InfoItem iconName={"local-phone"} heading={"+91" + contact2} text={""} />
    </Card>
  );
};

export default Contact;

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
});
