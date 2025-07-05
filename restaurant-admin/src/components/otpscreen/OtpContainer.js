import { StyleSheet, View, TextInput } from "react-native";
import React from "react";
import { useRef } from "react";

const OtpContainer = ({ name, style, otp, setOtp }) => {
  const inputRefs = useRef([...Array(6)].map(() => React.createRef()));

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < 5) inputRefs.current[index + 1].focus();

    if (!value && index > 0) inputRefs.current[index - 1].focus();
  };

  return (
    <View style={styles.parentContainer}>
      <View style={styles.container}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.input}
            maxLength={1}
            value={digit}
            keyboardType={"numeric"}
            onChangeText={(value) => handleOtpChange(index, value)}
            ref={(ref) => (inputRefs.current[index] = ref)}
          />
        ))}
      </View>
    </View>
  );
};

export default OtpContainer;

const styles = StyleSheet.create({
  parentContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  name: {
    fontSize: 13,
  },

  input: {
    height: 45,
    width: 45,
    borderColor: "#000",
    borderWidth: 1.5,
    borderRadius: 5,
    fontSize: 22,
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    textAlign: "center",
  },
});
