import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Modal from "react-native-modal";
import * as AuthSession from "expo-auth-session";
import { useAuthRequest, makeRedirectUri } from "expo-auth-session";

import base64 from "react-native-base64";

import CustomButton from "../components/CustomButtons";
import Footer from "../components/Footer";
import EditInfo from "../components/EditInfo";

export default function Settings() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [heartRate, setHeartRate] = useState(null);
  const [activity, setActivity] = useState(null);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: "23QTSZ",
      scopes: ["heartrate"],
      redirectUri: makeRedirectUri(),
      responseType: "code",
    },
    {
      authorizationEndpoint: "https://www.fitbit.com/oauth2/authorize",
    }
  );

  const handlePress = async (buttonName) => {
    if (buttonName === "Edit Info") {
      setShowEditModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttons}>
        <CustomButton
          title="Edit Info"
          onPress={() => handlePress("Edit Info")}
          style={styles.button}
        />
      </View>

      <Footer />
      <Modal
        isVisible={showEditModal}
        onSwipeComplete={handleCloseModal}
        swipeDirection="down"
      >
        <EditInfo />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#848884",
    alignSelf: "stretch",
    width: null,
  },
  buttons: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    padding: 100,
  },
  button: {
    marginVertical: 5,
  },
});
