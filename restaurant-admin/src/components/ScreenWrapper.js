import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, StatusBar } from "react-native";

const ScreenWrapper = ({ children }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ScreenWrapper;
