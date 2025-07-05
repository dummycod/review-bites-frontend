import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Register from "./src/screen/Register";
import LoginScreen from "./src/screen/LoginScreen";
import OtpScreen from "./src/screen/OtpScreen";
import UserDetailsScreen from "./src/screen/UserDetailsScreen";
import ProfileScreen from "./src/screen/ProfileScreen";
import PhotoScreen from "./src/screen/PhotoScreen";
import UserDashboard from "./src/screen/UserDashboard";
import LocationScreen from "./src/screen/LocationScreen";
import WelcomeScreen from "./src/screen/WelcomeScreen";
import HashtagSearch from "./src/screen/HashtagSearch";
import NearByRestaurantsAll from "./src/screen/NearByRestaurantsAll";
import TrendingRestaurants from "./src/screen/TrendingRestaurants";
import Search from "./src/screen/Search";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DashboardNavigation from "./src/navigation/DashboardTopNavigationBar";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LogBox } from "react-native";

import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_500Medium,
  Montserrat_500Medium_Italic,
} from "@expo-google-fonts/montserrat";

import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_500Medium,
    Montserrat_500Medium_Italic,
  });

  //Disabling Logs
  LogBox.ignoreLogs(["Warning: ..."]);
  LogBox.ignoreAllLogs();

  const [isFontReady, setIsFontReady] = useState(false);
  const [isInitReady, setIsInitReady] = useState(false);
  const [initialRoute, setInitialRoute] = useState("Welcome");

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
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
        const userId = await AsyncStorage.getItem("userId");
        if (token && userId) {
          setInitialRoute("UserDashboard");
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
    <>
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
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="VerifyOtp" component={OtpScreen} />
            <Stack.Screen name="UserDashboard" component={UserDashboard} />
            <Stack.Screen
              name="NearByRestaurants"
              component={NearByRestaurantsAll}
            />
            <Stack.Screen
              name="TrendingRestaurants"
              component={TrendingRestaurants}
            />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="HashtagSearch" component={HashtagSearch} />
            <Stack.Screen name="LocationError" component={LocationScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />

            <Stack.Screen
              name="UserDetailsScreen"
              component={UserDetailsScreen}
            />
            <Stack.Screen
              name="RestaurantDashboard"
              component={DashboardNavigation}
            />
            <Stack.Screen name="PhotoScreen" component={PhotoScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </>
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
