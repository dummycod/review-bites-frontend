import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

const useImagePicker = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

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
        setFile(result.assets[0].uri);
        console.log(result.assets[0].uri);
        setError(null);
      }
    }
  };

  return { file, error, pickImage };
};

export default useImagePicker;
