import React from "react";
import { View, StyleSheet, Text, Button, TouchableOpacity } from "react-native";
import WelcomeSvg from "../components/WelcomeSvg";

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.SVGcontainer}>
        <WelcomeSvg />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Welcome to Landmark</Text>
        <Text style={styles.subtext}>
          Get reliable and instant data on any landmark.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate("RegisterScreen")}
        >
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginText: {
    fontFamily: "Avenir",
    fontSize: 18,
    textAlign: "center",
    color: "#142143",
    fontWeight: "bold",
    textAlignVertical: "center",
  },
  loginButton: {
    backgroundColor: "white",
    width: 271,
    height: 65,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#737373",
    justifyContent: "center",
    top: 30,
  },
  registerText: {
    fontFamily: "Avenir",
    fontSize: 18,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    textAlignVertical: "center",
  },
  registerButton: {
    backgroundColor: "#EA765D",
    width: 271,
    height: 65,
    borderRadius: 7,
    justifyContent: "center",
  },
  buttonContainer: {
    alignItems: "center",
    flex: 0.3,
    padding: 30,
    top: 20,
  },
  subtext: {
    color: "#5A5A5A",
    fontFamily: "Avenir",
    fontSize: 18,
    textAlign: "center",
    top: 31,
  },
  title: {
    fontFamily: "Avenir",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  textContainer: {
    flex: 0.15,
  },
  SVGcontainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    top: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#F8FAFB",
  },
});

export default WelcomeScreen;
