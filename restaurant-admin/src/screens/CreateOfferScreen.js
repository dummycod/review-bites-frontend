import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  Alert,
} from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import OfferItem from "../components/offers/OfferItem";
import ColorSlider from "../components/ColorSlider";
import DetailsInput from "../components/basicDetails/DetailsInput";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "../components/Button";
import useApi from "../hooks/useApi";
import Spinner from "react-native-loading-spinner-overlay/lib";
import ScreenWrapper from "../components/ScreenWrapper";

const CreateOfferScreen = ({ navigation }) => {
  const { width } = Dimensions.get("window");
  const [oldColor, setOldColor] = useState("#FF7700");
  const [title, setTitle] = useState("Title goes here");
  const [description, setDescription] = useState("Description goes here");

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [validTillStr, setValidTillStr] = useState("N/A");

  const { data, loading, error, setError, fetchData, resetHookState } =
    useApi();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Create Offer",
      headerShown: true,
    });
  }, [navigation]);

  useEffect(() => {
    if (data) {
      Alert.alert("Added", "Offer added successfully", [
        {
          text: "Okay",
          onPress: () => {
            resetHookState();
          },
        },
      ]);
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

  const saveOffer = () => {
    const body = {
      heading: title,
      description: description,
      timestamp: date.getTime(),
      color: oldColor,
    };

    fetchData("/restaurant/add-offer", true, body, null, "temp");
  };

  const onValidDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setShowDatePicker(false);
    setDate(currentDate);

    const day = currentDate.toLocaleDateString("en-US", { day: "2-digit" });
    const month = currentDate.toLocaleDateString("en-US", { month: "short" });
    const year = currentDate.toLocaleDateString("en-US", { year: "numeric" });

    const formattedDate = `${day} ${month} ${year}`;
    setValidTillStr(formattedDate);
  };

  return (
    <ScreenWrapper>
      <View style={styles.root}>
        <Spinner
          visible={loading}
          textStyle={styles.spinnerStyle}
          color={"#F6544C"}
          size={"large"}
        />
        <OfferItem
          backgroundColor={oldColor}
          title={title}
          description={description}
          validTill={validTillStr}
        />
        <DetailsInput
          heading={"Title"}
          headingWidth={30}
          style={{ width: "80%", marginTop: 30, marginStart: 20 }}
          handleTextChange={(text) => setTitle(text)}
        />
        <DetailsInput
          heading={"Description"}
          headingWidth={80}
          style={{ width: "80%", marginTop: 30, marginStart: 20 }}
          handleTextChange={(text) => setDescription(text)}
        />
        <Pressable
          onPress={() => {
            setShowDatePicker(true);
          }}
          style={{ width: "40%", marginTop: 30, marginStart: 20 }}
        >
          <DetailsInput
            heading={"Valid Till"}
            headingWidth={65}
            height={200}
            style={{ width: "100%" }}
            textInputStyle={{ textAlign: "center" }}
            uneditable
            text={validTillStr}
          />
        </Pressable>
        <View style={styles.container}>
          <Text style={styles.heading}>Background color</Text>
          <ColorSlider
            width={width}
            oldColor={oldColor}
            setOldColor={setOldColor}
          />
        </View>
        <Button
          onclick={saveOffer}
          text={"Add Offer"}
          style={{ width: "70%", marginTop: 30, alignSelf: "center" }}
        />
        {showDatePicker && (
          <DateTimePicker
            mode="date"
            is24Hour={false}
            display="spinner"
            value={date}
            onChange={onValidDateChange}
          />
        )}
      </View>
    </ScreenWrapper>
  );
};

// width, onColorChange,
export default CreateOfferScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30,
    alignItems: "start",
  },
  heading: {
    fontSize: 18,
    fontFamily: "Montserrat_600SemiBold",
  },
  container: {
    width: "95%",
    borderWidth: 0.6,
    borderColor: "#bababa",
    borderRadius: 4,
    padding: 10,
    marginVertical: 40,
    alignSelf: "center",
  },
});
