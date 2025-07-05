import { StyleSheet, StatusBar } from "react-native";
import LoginScreen from "./src/screens/LoginScreen";
import OtpScreen from "./src/screens/OtpScreen";
import { ApiProvider } from "./src/context/ApiProvider";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DashboardNavigation from "./src/navigation/DashboardTopNavigationBar";
import * as SplashScreen from "expo-splash-screen";
import BasicDetailsScreen from "./src/screens/BasicDetailsScreen";
import CreateOfferScreen from "./src/screens/CreateOfferScreen";
import ManagePhoto from "./src/screens/ManagePhoto";
import PhotoScreen from "./src/screens/PhotoScreen";
import EditMenuScreen from "./src/screens/EditMenuScreen";
import MoreDetails from "./src/screens/MoreDetails";
import UpdateDetailsScreen from "./src/screens/UpdateDetailsScreen";
import RemoveOfferScreen from "./src/screens/RemoveOfferScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import EditMoreDetails from "./src/screens/EditMoreDetails";
import { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LogBox } from "react-native";

import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_500Medium,
} from "@expo-google-fonts/montserrat";

const Stack = createStackNavigator();

export default function App() {
  LogBox.ignoreLogs(["Warning: ..."]);
  LogBox.ignoreAllLogs();

  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_500Medium,
  });

  const [isFontReady, setIsFontReady] = useState(false);
  const [isInitReady, setIsInitReady] = useState(false);
  const [initialRoute, setInitialRoute] = useState("Welcome");

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        setIsInitReady(true);
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    async function checkAsyncStorage() {
      try {
        const token = await AsyncStorage.getItem("token");
        const userId = await AsyncStorage.getItem("restaurantId");
        if (token && userId) {
          setInitialRoute("DashboardNavigation");
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setIsInitReady(true);
      }
    }

    checkAsyncStorage();
  }, []);

  useEffect(() => {
    async function hideSplashScreen() {
      if (fontsLoaded) {
        setIsFontReady(true);
        await SplashScreen.hideAsync();
      }
    }
    hideSplashScreen();
  }, [fontsLoaded]);

  if (!isFontReady || !isInitReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            headerLeft: () => null,
          }}
          initialRouteName={initialRoute}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="VerifyOtp" component={OtpScreen} />

          <Stack.Screen
            name="DashboardNavigation"
            component={DashboardNavigation}
          />

          <Stack.Screen name="MoreDetails" component={MoreDetails} />

          <Stack.Screen name="EditMoreDetails" component={EditMoreDetails} />

          <Stack.Screen name="EditMenuScreen" component={EditMenuScreen} />

          <Stack.Screen
            name="UpdateDetailsScreen"
            component={UpdateDetailsScreen}
          />

          <Stack.Screen name="PhotoScreen" component={PhotoScreen} />
          <Stack.Screen name="Manage Photos" component={ManagePhoto} />
          <Stack.Screen
            name="BasicDetailsScreen"
            component={BasicDetailsScreen}
          />
          <Stack.Screen name="CreateOffer" component={CreateOfferScreen} />
          <Stack.Screen name="RemoveOffer" component={RemoveOfferScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
