import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Dashboard from "../screen/Dashboard";
import ReviewsScreen from "../screen/ReviewsScreen";
import MenuScreen from "../screen/MenuScreen";
import { StyleSheet, Animated, Pressable } from "react-native";
import { useState } from "react";
import StatusBar from "../components/StatusBar";
import { useNavigation } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();

function DashboardNavigation({ route }) {
  const { restaurantId } = route.params;

  const MAX_HEADER_HEIGHT = 270;
  const MIN_HEADER_HEIGHT = 0;

  const [showTopBar, setShowTopBar] = useState(false);
  const [scrollY] = useState(new Animated.Value(0));
  const [menuScreenSwipeEnabled, setMenuScreenSwipeEnabled] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [restaurnatName, setRestaurantName] = useState("");
  const [menuImages, setMenuImages] = useState(null);
  const [restaurantImages, setRestaurantImages] = useState([]);

  const imageHeight = scrollY.interpolate({
    inputRange: [0, MAX_HEADER_HEIGHT],
    outputRange: [MAX_HEADER_HEIGHT, MIN_HEADER_HEIGHT],
    extrapolate: "clamp",
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, MAX_HEADER_HEIGHT],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const navigationBarTranslate = scrollY.interpolate({
    inputRange: [0, MAX_HEADER_HEIGHT],
    outputRange: [230, 0],
    extrapolate: "clamp",
  });

  function createScrollHandler(scrollY) {
    return Animated.event(
      [{ nativeEvent: { contentOffset: { y: scrollY } } }],
      {
        useNativeDriver: false,
      }
    );
  }

  // Call the scroll handler function
  const handleScroll = createScrollHandler(scrollY);

  const nonDashboardScreenScroll = () => {
    scrollY.setValue(300);
  };

  const dashboardScreenScroll = () => {
    scrollY.setValue(0);
  };

  const navigation = useNavigation();

  return (
    <>
      {showTopBar && <StatusBar name={restaurnatName} />}
      <Animated.View style={{ ...styles.container, height: imageHeight }}>
        <Pressable
          onPress={() => {
            navigation.navigate("PhotoScreen", { restaurantImages });
          }}
        >
          <Animated.Image
            style={{ ...styles.image, opacity: imageOpacity }}
            source={{ uri: imageUri }}
          />

          <Animated.Text style={{ ...styles.photoBtn, opacity: imageOpacity }}>
            All Photos ({restaurantImages.length})
          </Animated.Text>
        </Pressable>
      </Animated.View>
      <Animated.View
        style={{
          flex: 1,
          position: "relative",
          top: showTopBar ? 0 : navigationBarTranslate,
          left: 0,
          right: 0,
        }}
      >
        <Tab.Navigator
          screenOptions={{
            tabBarIndicatorStyle: { backgroundColor: "#F6544C" },
            tabBarActiveTintColor: "#F6544C",
            tabBarInactiveTintColor: "#737373",
            tabBarStyle: {
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              backgroundColor: "#fff",
              elevation: 0,
              shadowOpacity: 0,
            },
            tabBarLabelStyle: {
              fontSize: 11,
              fontFamily: "Montserrat_600SemiBold",
            },
          }}
        >
          <Tab.Screen
            name="Home"
            component={Dashboard}
            initialParams={{
              handleScroll,
              dashboardScreenScroll,
              nonDashboardScreenScroll,
              setShowTopBar,
              setImageUri,
              setRestaurantName,
              setMenuImages,
              setRestaurantImages,
              restaurantId,
            }}
          />

          {menuImages && (
            <Tab.Screen
              name="Menu"
              component={MenuScreen}
              options={{ swipeEnabled: menuScreenSwipeEnabled }}
              initialParams={{
                nonDashboardScreenScroll,
                setShowTopBar,
                setMenuScreenSwipeEnabled,
                menuImages,
              }}
            />
          )}

          <Tab.Screen
            name="Reviews"
            component={ReviewsScreen}
            initialParams={{
              nonDashboardScreenScroll,
              setShowTopBar,
              restaurantId,
            }}
          />
        </Tab.Navigator>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 270,
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
  },
  image: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  photoBtn: {
    width: 110,
    padding: 6,
    backgroundColor: "#69ac26",
    color: "#fff",
    fontFamily: "Montserrat_500Medium",
    fontSize: 14,
    textAlign: "center",
    borderRadius: 4,
    position: "absolute",
    bottom: 50,
    right: 20,
  },
});

export default DashboardNavigation;
