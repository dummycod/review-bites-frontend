import React, { useState, useEffect, useLayoutEffect } from "react";
import DraggableFlatList from "react-native-draggable-flatlist";
import {
  Image,
  StyleSheet,
  View,
  Pressable,
  ToastAndroid,
  Text,
  Alert,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { AntDesign } from "@expo/vector-icons";
import Button from "../components/Button";
import * as ImagePicker from "expo-image-picker";
import useApi from "../hooks/useApi";
import CONSTANTS from "../context/constant";
import ScreenWrapper from "../components/ScreenWrapper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ManagePhoto = ({ route, navigation }) => {
  const [imageList, setImageList] = useState([]);
  const settings = route.params?.settings || false;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add Photos",
      headerShown: true,
    });
  }, [navigation]);

  const {
    data,
    error,
    setError,
    loading,
    fetchData,
    fetchUrl,
    resetHookState,
  } = useApi();

  saveChanges = () => {
    if (settings) {
      navigation.goBack();
    } else {
      navigation.replace("EditMenuScreen");
    }
  };

  const fetchPhotos = async () => {
    const restaurant_id = await AsyncStorage.getItem("restaurantId");
    fetchUrl(
      "/public/get-restaurant-images?restaurant_id=" + restaurant_id,
      false,
      "fetch-all"
    );
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data);
      const { requestCode } = data;
      switch (requestCode) {
        case "fetch-all":
          const map = data.map((str, index) => ({
            id: index,
            name: str,
          }));
          console.log(map);
          setImageList(map);
          break;
        case "image-upload":
          fetchPhotos();
          break;
        case "image-delete":
          fetchPhotos();
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
        uploadImage(result.assets[0]);
      }
    }
  };

  const uploadImage = (imageObj) => {
    const formData = new FormData();

    formData.append("file", {
      uri: imageObj.uri,
      type: "image/jpeg",
      name: "some-random-name.jpeg",
    });

    fetchData(
      `/restaurant/upload-image`,
      true,
      formData,
      "multipart/form-data",
      "image-upload"
    );
  };

  const uploadImageSuccess = (data) => {
    const fileObj = { name: data.name, key: data.id };
    setImageList((prevImageList) => [...prevImageList, fileObj]);
  };

  const deleteImage = (imageName) => {
    fetchData(
      `/restaurant/delete-image?imageName=${imageName}`,
      true,
      {},
      null,
      "image-delete"
    );
  };

  const deleteImageSuccess = (key) => {
    setImageList((prevImageList) =>
      prevImageList.filter((item) => {
        item.key !== key;
      })
    );
    ToastAndroid.show("Image removed", ToastAndroid.SHORT);
  };

  const rearrangeImage = () => {};

  const renderItem = ({ item, index, drag, isActive }) => (
    <Pressable onLongPress={drag} style={styles.container}>
      <Image
        source={{
          uri:
            CONSTANTS.BASE_URL +
            "/public/images/restaurant-images/" +
            item.name,
        }}
        style={styles.image}
      />
      <Pressable
        style={styles.icon}
        onPress={() => {
          deleteImage(item.name);
        }}
      >
        <AntDesign name="closecircle" size={28} color="#F6544C" />
      </Pressable>
    </Pressable>
  );

  return (
    <ScreenWrapper>
      <View style={styles.root}>
        <Spinner
          visible={loading}
          textStyle={styles.spinnerStyle}
          color={"#F6544C"}
          size={"large"}
        />
        {imageList.length == 0 ? (
          <View style={{ marginTop: "60%" }}>
            <Image
              style={styles.notFound}
              source={require("../../assets/images/nothing-here.png")}
            />
            <Text
              style={{
                alignSelf: "center",
                fontSize: 18,
                fontFamily: "Montserrat_600SemiBold",
                marginTop: 18,
              }}
            >
              No Images Found
            </Text>
          </View>
        ) : (
          <></>
        )}
        <DraggableFlatList
          data={imageList}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          onDragEnd={({ data }) => setImageList(data)}
          contentContainerStyle={{ paddingBottom: 60 }}
        />
        <View style={styles.btnContainer}>
          <Button
            text={"Save Changes"}
            style={styles.btn}
            onclick={saveChanges}
          />
          <Button
            text={"Add New Photo"}
            style={styles.btn}
            onclick={pickImage}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: "relative",
  },
  container: {
    height: 250,
    marginHorizontal: 10,
    marginVertical: 12,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 14,
  },

  notFound: {
    width: 150,
    height: 150,
    alignSelf: "center",
    resizeMode: "contain",
  },

  icon: {
    position: "absolute",
    top: -10,
    right: -4,
    borderRadius: 50,
    backgroundColor: "black",
  },
  btnContainer: {
    width: "100%",
    position: "absolute",
    zIndex: 999,
    bottom: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  btn: {
    width: "40%",
  },
});

export default ManagePhoto;
