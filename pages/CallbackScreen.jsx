import React from "react";
import { View, Text } from "react-native";

export default function CallbackScreen({ route }) {
  const { authorizationCode } = route.params;
  // Use the authorization code to exchange for an access token
  console.log(authorizationCode);
  return (
    <View>
      <Text>Authorization code: {authorizationCode}</Text>
    </View>
  );
}
