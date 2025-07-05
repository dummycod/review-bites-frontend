import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import { View, Image, StyleSheet, Dimensions, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Swiper from "react-native-swiper";
import useApi from "../hooks/useApi";
import Spinner from "react-native-loading-spinner-overlay/lib";
import CONSTANTS from "../context/constant";
import ScreenWrapper from "../components/ScreenWrapper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MenuScreen = ({ route }) => {
  const { setShowTopBar, nonDashboardScreenScroll, setMenuScreenSwipeEnabled } =
    route.params;
  const { data, error, setError, loading, fetchUrl } = useApi();

  const [imageList, setImageList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);

  const swiperRef = useRef(null);

  useEffect(() => {
    console.log("Called!!");
    console.log(data);
    if (data) {
      setImageList(data.menuImages);
      //resetHookState();
    }
    if (error) {
      Alert.alert("Error", error, [
        {
          text: "ok",
          onPress: () => {
            setError(null);
          },
        },
      ]);
    }
  }, [data, error]);

  const loadMenuImages = async () => {
    const restaurantId = await AsyncStorage.getItem("restaurantId");
    fetchUrl("/public/get-menu-image?restaurant_id=" + restaurantId);
  };

  useFocusEffect(
    useCallback(() => {
      setShowTopBar(true);
      nonDashboardScreenScroll();
      loadMenuImages();
    }, [nonDashboardScreenScroll])
  );

  const onIndexChangedCallback = useCallback((index) => {
    setCurrentIndex(index + 1);
    if (index + 1 == imageList.length) setMenuScreenSwipeEnabled(true);
    else setMenuScreenSwipeEnabled(false);
  }, []);

  const Item = ({ item }) => {
    const memoItem = useMemo(() => {
      return (
        <View style={styles.root}>
          <Image
            source={{
              uri:
                CONSTANTS.BASE_URL +
                "/public/images/menu-images/" +
                item.imageName,
            }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      );
    }, [item]);

    return memoItem;
  };

  return (
    <ScreenWrapper>
      <View style={{ flex: 1 }}>
        <Spinner
          visible={loading}
          textStyle={styles.spinnerStyle}
          color={"#F6544C"}
          size={"large"}
        />
        {imageList.length === 0 ? (
          <View style={{ marginTop: "60%" }}>
            <Image
              style={styles.notFound}
              source={require("../../assets/images/menu_icon.png")}
            />
            <Text
              style={{
                alignSelf: "center",
                fontSize: 18,
                fontFamily: "Montserrat_600SemiBold",
                marginVertical: 18,
              }}
            >
              No Menu Found
            </Text>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <Swiper
              ref={swiperRef}
              style={styles.root}
              loop={false}
              showsPagination={false}
              onIndexChanged={onIndexChangedCallback}
              key={imageList.length}
            >
              {imageList.map((item, index) => (
                <Item item={item} key={index} />
              ))}
            </Swiper>
            <Text style={styles.count}>
              <Text style={{ fontSize: 15 }}>{currentIndex}</Text>
              {" / " + imageList.length}
            </Text>
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
};
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  root: { height },
  image: {
    height,
    width,
    position: "absolute",
    top: -80,
    left: 0,
    opacity: 0.9,
  },
  count: {
    position: "relative",
    left: "45%",
    top: -8,
    width: 45,
    color: "#ffffff",
    backgroundColor: "#000",
    borderRadius: 8,
    padding: 6,
    fontSize: 13,
    textAlign: "center",
  },
  notFound: {
    width: 150,
    height: 150,
    alignSelf: "center",
    resizeMode: "contain",
  },
});

export default MenuScreen;
