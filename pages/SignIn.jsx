import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import SignUp from "./SignUp";
import { Input, Button } from "react-native-elements";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect } from "react";

const SignIn = ({ navigation }) => {
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    error: "",
  });

  const auth = getAuth();

  async function signIn() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
    }
  }

  useEffect(() => {
    if (value.error !== "") {
      const timer = setTimeout(() => {
        setValue({
          ...value,
          error: "",
        });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [value.error]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/logo-no-background.png")}
      />

      {!!value.error && (
        <View style={styles.error}>
          <Text style={styles.errorText}>Error: Wrong Email or Password</Text>
        </View>
      )}
      <Input
        placeholder="Email"
        containerStyle={styles.input}
        value={value.email}
        onChangeText={(text) => setValue({ ...value, email: text })}
        keyboardType="email-address"
        autoCapitalize="none"
        secureTextEntry={false}
      />

      <Input
        placeholder="Password"
        containerStyle={styles.input}
        value={value.password}
        onChangeText={(text) => setValue({ ...value, password: text })}
        secureTextEntry={true}
      />

      <TouchableOpacity
        style={{
          marginBottom: 10,
          backgroundColor: "#ffcb05",
          padding: 10,
          alignItems: "center",
          borderRadius: 10,
          width: "50%",
        }}
        onPress={signIn}
      >
        <Text style={{ color: "#000" }}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "darkgray",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 48,
    marginBottom: 20,
    color: "gray",
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "#888",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  logo: {
    height: 250,
    width: 250,
    marginBottom: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#10717F",
    padding: 10,
    borderRadius: 10,
    width: "50%",
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
  },
  signUpText: {
    marginTop: 20,
    color: "#fff",
  },
});

export default SignIn;
