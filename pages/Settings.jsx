import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Linking,
} from "react-native";
import Modal from "react-native-modal";
import "react-native-gesture-handler";
import React, { useState } from "react";
import CustomButton from "../components/CustomButtons";
import Footer from "../components/Footer";
import EditInfo from "../components/EditInfo";
import axios from "axios";
import { WebView } from "react-native-webview";

export default function Settings() {
  const clientId = "23QT8M";
  const redirectUri = "https://www.fitbit.com/user/5PL79B";
  const authorizationUrl = "https://www.fitbit.com/oauth2/authorize";
  const scope = "activity";

  const clientSecret = "21cee8ed388cef3e5a93d87132219c97";

  const tokenUrl = "https://api.fitbit.com/oauth2/token";

  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const exchangeAuthorizationCode = async (authorizationCode) => {
    try {
      const response = await axios.post(tokenUrl, {
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
        code: authorizationCode,
      });
      console.log(response.data);
      const accessToken = response.data.access_token;
      const refreshToken = response.data.refresh_token;
      console.log(accessToken);

      // Store the access token and refresh token securely in your app
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFitbitButtonPress = async () => {
    try {
      const url = `${authorizationUrl}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
      await Linking.openURL(url);

      // Listen to URL changes
      Linking.addEventListener("url", (event) => {
        const authorizationCode = event.url.split("code=")[1];
        console.log(authorizationCode);
        if (authorizationCode) {
          exchangeAuthorizationCode(authorizationCode);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const [buttons, setButtons] = useState([
    "Edit Info",
    "I Smoked, restart",
    "Link Fitbit",
    "About app",
  ]);

  const handlePress = (buttonName) => {
    if (buttonName === "Edit Info") {
      setShowEditModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    console.log("close modal");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttons}>
        {buttons.map((buttonName, index) => (
          <CustomButton
            key={index}
            title={buttonName}
            onPress={() => {
              if (buttonName === "Link Fitbit") {
                handleFitbitButtonPress();
              } else {
                handlePress(buttonName);
              }
            }}
            style={styles.button}
          />
        ))}
      </View>
      <Text style={{ color: "#000", fontSize: 30 }}>
        Access Token: {accessToken}
      </Text>
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
