import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import SettingScreenItem from "../components/settings/SettingScreenItem";
import ScreenWrapper from "../components/ScreenWrapper";

const SettingsScreen = ({ route, navigation }) => {
  useFocusEffect(
    useCallback(() => {
      route.params.setShowTopBar(true);
      route.params.nonDashboardScreenScroll();
    }, [route.params.nonDashboardScreenScroll])
  );

  /***
   * Edit Details : Name Timings, Location, Contact, About Us
   *
   */

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName, {
      settings: true,
    });
  };

  const data = [
    { key: "01", name: "Edit Details", screenName: "UpdateDetailsScreen" },
    { key: "08", name: "Edit About Us", screenName: "EditMoreDetails" },
    { key: "02", name: "Add Offers", screenName: "CreateOffer" },
    { key: "03", name: "Remove  Offers", screenName: "RemoveOffer" },
    { key: "04", name: "Add/Remove Photos", screenName: "Manage Photos" },
    { key: "05", name: "Add/Remove Menu", screenName: "EditMenuScreen" },
    { key: "06", name: "Remove Reviews", screenName: "EditMenuScreen" },
    { key: "07", name: "Delete Account", screenName: "EditMenuScreen" },
  ];

  /***
   *
   * Name
   * Timings
   * Location
   * About Us
   * Contact
   */

  return (
    <ScreenWrapper>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <SettingScreenItem
            item={item}
            navigateToScreen={navigateToScreen}
            redBold={item.name === "Delete Account"}
          />
        )}
        keyExtractor={(item) => item.key}
      />
    </ScreenWrapper>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  list: {
    marginTop: 12,
  },
});
