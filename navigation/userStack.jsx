import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Dashboard from "../pages/Dashboard";
import Settings from "../pages/Settings";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={({ navigation }) => ({
            headerBackTitleVisible: false,
            headerTitle: "",
            headerTransparent: true,
          })}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={({ navigation }) => ({
            headerBackTitleVisible: false,
            headerTitle: "",
            headerTransparent: true,
          })}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={({ navigation }) => ({
            headerBackTitleVisible: false,
            headerTitle: "",
            headerTransparent: true,
          })}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={({ navigation }) => ({
            headerBackTitleVisible: false,
            headerTitle: "",
            headerTransparent: true,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
