import React from "react";
import { useState } from "react";

import {
  View,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  TextInput,
  InputAccessoryView,
} from "react-native";
import colors from "../config/colors";
//import { Form, InputText} from 'validate-form-in-expo-style';

function Login(props) {
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.appName}> Attendance</Text>
          <Text style={styles.appName}> Marking</Text>
        </View>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/VOlogos/logo_big.png")}
          />
        </View>
      </View>
      <Pressable
        style={styles.anchorButton}
        onPress={() => Alert.alert("Can't Switch to Sinhala!")}
      >
        <Text style={[styles.anchorText, { paddingTop: 8 }]}>
          Switch to Sinhala
        </Text>
      </Pressable>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
      />
      <Pressable
        style={[styles.anchorButton, { alignSelf: "center" }]}
        onPress={() => Alert.alert("Can't Sing In now!")}
      >
        <Text style={styles.anchorText}>
          Forgot Password or Don't Have an Account?
        </Text>
      </Pressable>
      <Image
        style={styles.middleImage}
        source={require("../assets/higirl.png")}
      />
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => {
          var axios = require("axios");
          axios
            .post("http://192.168.1.9:3030/api/v1/login", {
              email: email,
              password: password,
            })
            .then((res) => {
              let data = res.data;
              // Token should be avail. if successful
              if (data.token) {
                props.navigation.navigate("Home");
              } else {
                Alert.alert("Login failed. Username or password is incorrect.");
              }
            });
        }}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
  },
  rowContainer: {
    flexDirection: "row",
  },
  appName: {
    fontFamily: "sans-serif",
    fontWeight: "bold",
    fontSize: 30,
    flexWrap: "wrap",
    color: colors.black,
  },
  titleContainer: {
    flex: 1,
  },
  logoContainer: {
    flex: 1,
  },
  logo: {
    alignSelf: "flex-end",
    height: 100,
    width: 150,
    paddingRight: 10,
  },
  input: {
    height: 40,
    margin: 12,
    backgroundColor: colors.greyTextArea,
    paddingLeft: 10,
  },
  anchorButton: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  anchorText: {
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: colors.purpleText,
  },
  loginButton: {
    position: "absolute",
    bottom: 55,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
    height: 50,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 28,
    elevation: 3,
    backgroundColor: colors.purpleDull,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    fontWeight: "bold",
    color: colors.white,
  },
  middleImage: {
    width: 141,
    height: 147,
    alignSelf: "center",
    top: 100,
  },
});

export default Login;
