import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  SliderHuePicker,
  SliderSaturationPicker,
  SliderValuePicker,
} from "react-native-slider-color-picker";
import tinycolor from "tinycolor2";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const ColorSlider = ({ width, oldColor, setOldColor }) => {
  const changeColor = (colorHsvOrRgb, resType) => {
    if (resType === "end") {
      setOldColor(tinycolor(colorHsvOrRgb).toHexString());
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View
        style={{
          marginHorizontal: 24,
          marginTop: 20,
          height: 12,
        }}
      >
        <SliderHuePicker
          oldColor={oldColor}
          trackStyle={[{ height: 12, width: width - 48 }]}
          thumbStyle={styles.thumb}
          useNativeDriver={true}
          onColorChange={changeColor}
        />
      </View>

      <View
        style={{
          marginHorizontal: 24,
          marginTop: 20,
          height: 12,
          width: width - 48,
        }}
      >
        <SliderSaturationPicker
          oldColor={oldColor}
          trackStyle={[{ height: 12, width: width - 48 }]}
          thumbStyle={styles.thumb}
          useNativeDriver={true}
          onColorChange={changeColor}
          style={{
            height: 12,
            borderRadius: 6,
            backgroundColor: tinycolor({
              h: tinycolor(oldColor).toHsv().h,
              s: 1,
              v: 1,
            }).toHexString(),
          }}
        />
      </View>
      <View
        style={{
          marginHorizontal: 24,
          marginTop: 20,
          height: 12,
          width: width - 48,
        }}
      >
        <SliderValuePicker
          oldColor={oldColor}
          minimumValue={0.02}
          step={0.05}
          trackStyle={[{ height: 12, width: width - 48 }]}
          trackImage={require("react-native-slider-color-picker/brightness_mask.png")}
          thumbStyle={styles.thumb}
          onColorChange={changeColor}
          style={{ height: 12, borderRadius: 6, backgroundColor: "black" }}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default ColorSlider;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  thumb: {
    width: 20,
    height: 20,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.35,
  },
});
