import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CustomButton = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderColor: "#F9CC0B",
    borderRadius: 15,
    padding: 10,
    marginVertical: 5,
    height: 50,
    width: "100%",
  },
  text: {
    color: "#F9CC0B",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "800",
  },
});

export default CustomButton;
