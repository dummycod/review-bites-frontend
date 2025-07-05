import { StyleSheet, View, Modal } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import ScreenWrapper from "../components/ScreenWrapper";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const PhotoScreen = ({ route }) => {
  const { restaurantImages } = route.params;

  const [visible, setVisible] = useState(true);

  const navigation = useNavigation();

  const imageUrls = restaurantImages.map((imageName) => ({
    url: `${CONSTANTS.BASE_URL}/public/images/restaurant-images/${imageName}`,
  }));

  console.log(imageUrls);

  return (
    <ScreenWrapper>
      <Modal
        visible={visible}
        transparent={true}
        onRequestClose={() => {
          setVisible(false);
          navigation.goBack();
        }}
      >
        <View style={{ flex: 1 }}>
          <ImageViewer imageUrls={imageUrls} />
        </View>
      </Modal>
    </ScreenWrapper>
  );
};

export default PhotoScreen;

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    padding: 10,
    paddingTop: 20,
    fontFamily: "Montserrat_600SemiBold",
    backgroundColor: "#fff",
    elevation: 1,
  },
  image: {
    width: "95%",
    height: 250,
    marginVertical: 12,
    borderRadius: 14,
    alignSelf: "center",
  },
});
