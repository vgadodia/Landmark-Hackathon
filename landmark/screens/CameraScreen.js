import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import ImgToBase64 from 'react-native-image-base64';

let photo = "";

export default class CameraScreen extends React.Component {
  state = {
    hasPermission: null,
    cameraType: Camera.Constants.Type.back,
  };

  async componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    // Camera roll Permission
    if (Platform.OS === "ios") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
    // Camera Permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === "granted" });
  };

  handleCameraType = () => {
    const { cameraType } = this.state;

    this.setState({
      cameraType:
        cameraType === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back,
    });
  };

  takePicture = async () => {
    if (this.camera) {

      const options = { base64: true };
      let photo = await this.camera.takePictureAsync(options);
      // console.log(photo.base64)

      this.props.navigation.navigate("ConfirmImage", {
        photoUrl: photo.uri,
        base64: photo.base64,
      });
    }
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    console.log(result);
  };

  render() {
    const { hasPermission } = this.state;
    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else if (photo !== "") {
      return <Text>Hello</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.cameraType}
            ref={(ref) => {
              this.camera = ref;
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("ImageScreen")}
            >
              <MaterialCommunityIcons
                style={{
                  top: 55,
                  left: 330,
                  opacity: 1,
                }}
                name="close-circle"
                color={"white"}
                size={70}
              />
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                margin: 30,
              }}
            >
              {/* <TouchableOpacity
                style={{
                  alignSelf: "flex-end",
                  alignItems: "center",
                  backgroundColor: "transparent",
                }}
                onPress={() => this.pickImage()}
              >
                <Ionicons
                  name="ios-photos"
                  style={{ color: "#fff", fontSize: 40 }}
                />
              </TouchableOpacity> */}
              <TouchableOpacity
                style={{
                  alignSelf: "flex-end",
                  alignItems: "center",
                }}
                onPress={() => this.takePicture()}
              >
                {/* <FontAwesome
                  name="camera"
                  style={{ color: "#fff", fontSize: 40 }}
                /> */}
                <View
                  style={{
                    backgroundColor: "white",
                    width: 90,
                    height: 90,
                    borderRadius: 45,
                    borderWidth: 10,
                    borderColor: "silver",
                  }}
                ></View>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}
