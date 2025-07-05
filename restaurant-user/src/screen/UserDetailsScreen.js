import { StyleSheet, ScrollView, Alert, Image } from "react-native";
import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import DetailsInput from "../components/basicDetails/DetailsInput";
import Button from "../components/Button";
import useApi from "../hooks/useApi";
import Spinner from "react-native-loading-spinner-overlay";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScreenWrapper from "../components/ScreenWrapper";
import Heading from "../components/Heading";

const UserDetailsScreen = ({ route, navigation }) => {
  const { contactNumber } = route.params;

  const { data, error, loading, fetchData, setError, resetHookState } =
    useApi();

  const defaultImage = require("../../assets/images/profile.png");

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    const handleData = async () => {
      if (data) {
        const { requestCode } = data;
        switch (requestCode) {
          case "image-upload":
            setFile(data.imageName);
            break;
          case "complete-registration":
            await AsyncStorage.setItem("token", data.token);
            await AsyncStorage.setItem("userId", JSON.stringify(data.id));
            navigation.replace("UserDashboard");
            break;
          default:
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
    };

    handleData();
  }, [data, error]);

  const completeRegistrationUrl = "/public/register-user";

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
        uploadProfilePicture(result.assets[0]);
      }
    }
  };

  const completeRegstration = async () => {
    const body = {
      username,
      firstName,
      lastName,
      contactNumber,
      imageName: file,
    };

    fetchData(
      completeRegistrationUrl,
      false,
      body,
      "application/json",
      "complete-registration"
    );
  };

  const uploadProfilePicture = (imageObj) => {
    let url = "/public/add-profile-image";
    const formData = new FormData();
    formData.append("file", {
      uri: imageObj.uri,
      type: "image/jpeg",
      name: "name.jpeg",
    });
    fetchData(url, false, formData, "multipart/form-data", "image-upload");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Almost Done!",
      headerShown: true,
      headerTitleStyle: {
        fontFamily: "Montserrat_600SemiBold",
      },
    });
  }, [navigation]);

  return (
    <ScreenWrapper>
      <ScrollView
        style={styles.root}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spinner
          visible={loading}
          textStyle={styles.spinnerStyle}
          color={"#F6544C"}
          size={"large"}
        />
        <Image
          source={
            file
              ? {
                  uri:
                    CONSTANTS.BASE_URL +
                    "/public/images/profile-images/" +
                    file,
                }
              : defaultImage
          }
          style={styles.image}
        />

        <Button
          text={"Add Photo "}
          style={{ width: "30%", paddingVertical: 8 }}
          onclick={pickImage}
        />

        <DetailsInput
          heading={"Username"}
          headingWidth={80}
          style={{ width: "80%", marginTop: 60 }}
          text={username}
          handleTextChange={(v) => setUsername(v)}
        />

        <DetailsInput
          heading={"First Name"}
          headingWidth={80}
          style={{ width: "80%", marginTop: 30 }}
          text={firstName}
          handleTextChange={(v) => setFirstName(v)}
        />

        <DetailsInput
          heading={"Last Name"}
          headingWidth={80}
          height={200}
          style={{ width: "80%", marginTop: 30 }}
          text={lastName}
          handleTextChange={(v) => setLastName(v)}
        />

        <Button
          text={"Continue"}
          style={{ width: "70%", marginTop: 50 }}
          onclick={completeRegstration}
        />
      </ScrollView>
    </ScreenWrapper>
  );
};

export default UserDetailsScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fdfdfd",
  },

  image: {
    height: 130,
    width: 130,
    resizeMode: "cover",
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 70,
    overflow: "hidden",
  },
});
