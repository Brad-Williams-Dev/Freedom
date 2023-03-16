import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import React from "react";

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/logo-color.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.indicatorContainer}>
        <ActivityIndicator size="large" color="#F9CC0B" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#0C1D36",
    alignSelf: "stretch",
    width: null,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  indicatorContainer: {
    marginBottom: 80,
  },
});
