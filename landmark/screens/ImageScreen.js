import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import SvgComponent4 from "../svg/SvgComponent4";
import * as ImagePicker from "expo-image-picker";

function ImageScreen({ navigation }) {
  const pickImage = async () => {
    const options = { base64: true };
    let result = await ImagePicker.launchImageLibraryAsync(options, {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    // console.log(result);
    if (result.uri) {
      navigation.navigate("ConfirmLibraryImage", {
        photoUrl: result.uri,
        base64: result.base64,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Choose an option to get started</Text>
      </View>
      <View style={styles.SVGcontainer}>
        <SvgComponent4 />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate("CameraScreen")}
        >
          <Text style={styles.registerText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => pickImage()}
        >
          <Text style={styles.loginText}>Select from camera roll</Text>
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
    top: 30,
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
    top: 120,
    padding: 10,
  },
  SVGcontainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    top: 50,
    right: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#F8FAFB",
  },
});

export default ImageScreen;
