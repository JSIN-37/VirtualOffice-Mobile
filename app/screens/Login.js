import React from "react";
import { useState, useEffect } from "react";
import { View, Pressable, StyleSheet, Text, TouchableOpacity, Alert, Image, TextInput, Switch} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from "../config/colors";
import { eachHourOfInterval } from "date-fns";
import { LongPressGestureHandler } from "react-native-gesture-handler";
//import { Form, InputText } from 'validate-form-in-expo-style';

function Login(props) {
    
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const [rememberMe, setRememberMe] = useState(email? true : false);

  useEffect(() => {
    async function getUserEmail () {
      const userEmail = await getRememberedUser();
      console.log(userEmail);
      console.log(email);
      setEmail(userEmail || "");
      setRememberMe(userEmail ? true : false );
    }
    getUserEmail();
  }, []);
  
  const toggleRememberMe = value => {
    setRememberMe(value);
    if (value === true) {
    //user wants to be remembered.
      rememberUser();
    } else {
      forgetUser();
    }
  }

  async function rememberUser () {
    try {
      await AsyncStorage.setItem('user-email', JSON.stringify(email));
      console.log('remember');
    } catch (error) {
      console.log('Remember user error');
    }
  };

  async function getRememberedUser () {
    try {
      const userEmail = await AsyncStorage.getItem('user-email');
      return userEmail != null ? JSON.parse(userEmail) : null;
    } catch (error) {
      console.log('Get remember user error');
    }
  };
  
  async function forgetUser () {
      try {
        await AsyncStorage.removeItem('user-email');
      } catch (error) {
        console.log('Forget user error');
      }
  };

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
        onPress={() => Alert.alert("Can't switch to Sinhala!")}
      >
        <Text style={[styles.anchorText, { paddingTop: 8 }]}>
          Switch to Sinhala
        </Text>
      </Pressable>
      <TextInput
        style={styles.input}
        value = {email}
        keyboardType= "email-address"
        placeholder= "Email"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.rowContainer}>
        <Switch
          value={rememberMe}
          thumbColor = {colors.purpleDull}
          trackColor = {{false: colors.greyText, true: colors.purpleLight}}
          onValueChange={(value) => toggleRememberMe(value)}
        />
        <Text style={{paddingHorizontal: 5}}>Remember Me</Text>
      </View>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => { props.navigation.navigate("Home");
          /* let axios = require("axios");
          axios
            .post("http://35.232.73.124:3040/api/v1/docs/#/User/post_user_login", {
              email: email,
              password: password,
            })
            .then((res) => {
              let data = res.data;
              // Token should be avail. if successful
              if (data.token) {
                props.navigation.navigate("Home", {userToken: data.token});
              } else {
                Alert.alert("Login failed. Username or password is incorrect.");
              }
            }); */
        }}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Pressable
        style={[styles.anchorButton, { alignSelf: "center" }]}
        onPress={() => Alert.alert("Please contact the administrator of VirtualOffice.")}
      >
        <Text style={styles.anchorText}>
          Forgot Password or Don't Have an Account?
        </Text>
      </Pressable>
      <Image
        style={styles.middleImage}
        source={require("../assets/higirl.png")}
      />
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
    alignItems: "center",
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
    marginVertical: 20,
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
    width: 148,
    height: 155,
    alignSelf: "center",
    top: 45,
  },
});

export default Login;
