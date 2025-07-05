import { View, Text } from "react-native";
import React from "react";

const MontserratText = ({ type, style, children }) => {
  return (
    <View>
      <Text style={{ fontFamily: fontFamily, ...style }}>{children}</Text>
    </View>
  );
};

export default MontserratText;
//Working on Digibox
