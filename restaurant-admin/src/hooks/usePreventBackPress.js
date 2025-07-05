import { useEffect } from "react";
import { BackHandler } from "react-native";

const usePreventBackPress = () => {
  useEffect(() => {
    const handleBackPress = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );
    return () => backHandler.remove();
  }, []);
};

export default usePreventBackPress;
