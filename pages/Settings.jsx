import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Modal from "react-native-modal";
import * as AuthSession from "expo-auth-session";
import base64 from "react-native-base64";
import queryString from "query-string";

import CustomButton from "../components/CustomButtons";
import Footer from "../components/Footer";
import EditInfo from "../components/EditInfo";

const authorizationEndpoint = "https://www.fitbit.com/oauth2/authorize";
const clientId = "23QTSZ";
const clientSecret = "493c7e1cffd74d4c903dcab96f32f7b2";
const redirectUri = "https://auth.expo.io/@brizzle/freedom";

const params = {
  client_id: clientId,
  redirect_uri: redirectUri,
  response_type: "code",
  scope: "heartrate sleep",
};

const authUrl = `${authorizationEndpoint}?${queryString.stringify(params)}`;

async function exchangeCodeForToken(code) {
  const tokenUrl = "https://api.fitbit.com/oauth2/token";
  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      Authorization: `Basic ${base64.encode(`${clientId}:${clientSecret}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: queryString.stringify({
      client_id: clientId,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUri,
    }),
  });

  const data = await response.json();

  // console.log("Response status:", response.status);
  // console.log("Token data:", data);

  return data;
}

export default function Settings() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [heartRateData, setHeartRateData] = useState(null);

  async function fetchHeartRateData(accessToken) {
    const heartRateUrl = `https://api.fitbit.com/1/user/-/activities/heart/date/today/30d.json`;

    const response = await fetch(heartRateUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    // Extract just the resting heart rates
    const restingHeartRates = data["activities-heart"].map((day) => {
      return {
        date: day.dateTime,
        restingHeartRate: day.value.restingHeartRate,
      };
    });

    console.log("Resting heart rates:", restingHeartRates);

    return restingHeartRates;
  }

  const handlePress = async (buttonName) => {
    if (buttonName === "Edit Info") {
      setShowEditModal(true);
    } else if (buttonName === "Link Fitbit") {
      const result = await AuthSession.startAsync({
        authUrl: authUrl,
      });

      // console.log("AuthSession result:", result);

      if (result.type === "success") {
        const code = result.params.code;
        const tokenData = await exchangeCodeForToken(code);
        setAccessToken(tokenData.access_token);
        const heartRateData = await fetchHeartRateData(tokenData.access_token);
      }
    }
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  console.log("Heart rate data:", heartRateData);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttons}>
        <CustomButton
          title="Edit Info"
          onPress={() => handlePress("Edit Info")}
          style={styles.button}
        />
      </View>
      <View style={styles.buttons}>
        <CustomButton
          title="Link Fitbit"
          onPress={() => handlePress("Link Fitbit")}
          style={styles.button}
        />
      </View>
      <View style={styles.buttons}>
        <CustomButton
          title="About"
          onPress={() => handlePress("About")}
          style={styles.button}
        />
      </View>
      {/* {heartRateData && (
        <View>
          <Text>
            Heart Rate: {heartRateData["activities-heart"][0].value.heartRate}
          </Text>
        </View>
      )} */}

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
    backgroundColor: "#17181a",
    alignSelf: "stretch",
    width: null,
  },
  buttons: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    padding: 100,
  },
  button: {
    marginVertical: 5,
  },
});
