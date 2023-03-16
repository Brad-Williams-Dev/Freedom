import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Footer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
        <Ionicons name="ios-speedometer" size={24} color="#F9CC0B" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Health")}>
        <Ionicons name="ios-heart" size={24} color="#F9CC0B" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Achievements")}>
        <Ionicons name="ios-trophy" size={24} color="#F9CC0B" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <Ionicons name="ios-settings" size={24} color="#F9CC0B" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#848884",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
  },
  text: {
    color: "#666",
  },
});

export default Footer;
