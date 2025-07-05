import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Card from "../Card";
import { calculateContrast } from "../../utils/ColorUtility";
import { MaterialIcons } from "@expo/vector-icons";

const OfferItem = ({
  backgroundColor,
  title,
  description,
  validTill,
  id,
  onDelete,
}) => {
  const textColor = calculateContrast(backgroundColor);

  return (
    <Card style={{ ...styles.root, backgroundColor }}>
      <View style={styles.header}>
        <Text style={{ ...styles.heading, color: textColor }}>{title}</Text>
        {onDelete && (
          <Pressable
            onPress={() => {
              onDelete(id);
            }}
          >
            <MaterialIcons name="delete" size={20} color={textColor} />
          </Pressable>
        )}
      </View>
      <Text style={{ ...styles.description, color: textColor }}>
        {description}
      </Text>
      <Text style={{ ...styles.valid, color: textColor }}>
        Valid till {validTill}
      </Text>
    </Card>
  );
};

export default OfferItem;

const styles = StyleSheet.create({
  root: {
    width: "95%",
    paddingVertical: 18,
    borderRadius: 8,
    alignSelf: "center",
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 18,
    fontFamily: "Montserrat_600SemiBold",
  },
  description: {
    fontSize: 13,
    fontFamily: "Montserrat_500Medium",
    marginTop: 10,
  },
  valid: {
    alignSelf: "flex-end",
    fontFamily: "Montserrat_500Medium",
    fontSize: 12,
    marginTop: 10,
  },
});
