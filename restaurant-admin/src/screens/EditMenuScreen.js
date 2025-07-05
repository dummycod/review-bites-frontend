import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  Pressable,
  Alert,
  ToastAndroid,
} from "react-native";
import Swiper from "react-native-swiper";
import * as ImagePicker from "expo-image-picker";
import useApi from "../hooks/useApi";
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CONSTANTS from "../context/constant";
import ScreenWrapper from "../components/ScreenWrapper";

const EditMenuScreen = ({ route, navigation }) => {
  const swiperRef = useRef(null);
  const [imageList, setImageList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);

  const settings = route.params?.settings || false;

  const {
    data,
    error,
    setError,
    loading,
    fetchData,
    fetchUrl,
    resetHookState,
  } = useApi();

  useEffect(() => {
    getAllMenuImages();
  }, []);

  useEffect(() => {
    if (data) {
      const { requestCode } = data;
      switch (requestCode) {
        case "fetch-all":
          getAllMenuImagesSuccess(data);
          break;
        case "image-upload":
          uploadMenuImageSuccess(data);
          break;
        case "image-delete":
          deleteMenuImageSuccess(data);
          break;
        case "arrange-image":
          break;
      }

      resetHookState();
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

  const onIndexChangedCallback = useCallback((index) => {
    if (index != 0 && index === currentIndex - 1) return;
    setCurrentIndex(index + 1);
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status != "granted") {
      Alert.alert(
        "Permission Denied",
        `Sorry, we need camera roll permission to upload images.`
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync();

      if (!result.canceled) {
        uploadMenuImage(result.assets[0]);
      }
    }
  };

  const navigateToDashboard = () => {
    navigation.replace("DashboardNavigation");
  };

  const getAllMenuImages = async () => {
    const restaurantId = await AsyncStorage.getItem("restaurantId");
    let url = "/public/get-menu-image?restaurant_id=" + restaurantId;
    fetchUrl(url, false, "fetch-all");
  };

  const getAllMenuImagesSuccess = (data) => {
    const list = data.menuImages.map((item) => ({
      name: item.imageName,
      key: item.id,
    }));
    setImageList((prevImageList) => [...prevImageList, ...list]);
  };

  const uploadMenuImage = (imageObj) => {
    let url = "/restaurant/add-menu-image";
    const formData = new FormData();
    formData.append("file", {
      uri: imageObj.uri,
      type: "image/jpeg",
      name: "some-random-name.jpeg",
    });
    fetchData(url, true, formData, "multipart/form-data", "image-upload");
  };

  const uploadMenuImageSuccess = (data) => {
    let image = { name: data.imageName, key: data.id };
    setImageList((prevData) => [...prevData, image]);
  };

  const deleteMenuImage = (imageName) => {
    let url = "/restaurant/delete-menu-image?imageName=" + imageName;
    fetchData(url, true, {}, null, "image-delete");
  };

  const deleteMenuImageSuccess = (data) => {
    let imageId = data.imageId;
    if (imageList.length == 1) {
      setImageList([]);
    } else {
      setImageList((prevList) => {
        console.log(temp);
        let temp = prevList.filter((item) => item.key !== imageId);
        console.log(imageId);
        console.log("Here-->>" + temp);
        return temp;
      });
      let newIndex = 1;
      setCurrentIndex(newIndex);
      ToastAndroid.show("Image removed", ToastAndroid.SHORT);
    }
  };

  const Item = ({ item }) => {
    const memoItem = useMemo(() => {
      return (
        <View style={styles.root}>
          <Image
            source={{
              uri:
                CONSTANTS.BASE_URL + "/public/images/menu-images/" + item.name,
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
        {!settings && (
          <Pressable
            style={{ zIndex: 0.5 }}
            onPress={() => {
              navigateToDashboard();
            }}
          >
            <Text style={styles.next}>
              <Text style={{ fontSize: 15 }}>Finish</Text>
            </Text>
          </Pressable>
        )}
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
          <View style={{ flex: 1, marginTop: 20 }}>
            <Swiper
              ref={swiperRef}
              style={styles.root}
              loop={false}
              showsPagination={false}
              key={imageList.length}
              onIndexChanged={onIndexChangedCallback}
            >
              {imageList.map((item, index) => (
                <Item item={item} key={index} />
              ))}
            </Swiper>
          </View>
        )}

        <View style={styles.btnContainer}>
          {imageList.length === 0 ? (
            <></>
          ) : (
            <>
              <Text style={styles.count}>
                <Text style={{ fontSize: 15 }}>{currentIndex}</Text>
                {" / " + imageList.length}
              </Text>
              <Pressable
                onPress={() => {
                  deleteMenuImage(imageList[currentIndex - 1].name);
                }}
              >
                <Text style={styles.removeBtn}>Remove</Text>
              </Pressable>
            </>
          )}
          <Pressable
            onPress={() => {
              pickImage();
            }}
          >
            <Text style={styles.addBtn}>Add</Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  root: { height, marginTop: 20 },
  image: {
    height: height - 100,
    width,
    position: "absolute",
    top: -10,
    left: 0,
    opacity: 1,
  },
  btnContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  count: {
    position: "absolute",
    left: "45%",
    bottom: 80,
    width: 50,
    color: "#ffffff",
    backgroundColor: "#000",
    borderRadius: 8,
    padding: 6,
    fontSize: 13,
    textAlign: "center",
  },
  removeBtn: {
    width: 100,
    textAlign: "center",
    borderRadius: 4,
    fontFamily: "Montserrat_500Medium",
    fontSize: 17,
    backgroundColor: "#F6544C",
    color: "white",
    padding: 6,
    paddingHorizontal: 8,
  },

  addBtn: {
    width: 100,
    textAlign: "center",
    borderRadius: 4,
    fontFamily: "Montserrat_500Medium",
    fontSize: 17,
    backgroundColor: "#69ac26",
    color: "white",
    padding: 6,
    paddingHorizontal: 8,
  },

  notFound: {
    width: 150,
    height: 150,
    alignSelf: "center",
    resizeMode: "contain",
  },

  next: {
    position: "absolute",
    right: 8,
    top: 8,
    backgroundColor: "black",
    padding: 8,
    paddingHorizontal: 12,
    fontFamily: "Montserrat_500Medium",
    borderRadius: 4,
    color: "white",
  },
});

export default EditMenuScreen;
