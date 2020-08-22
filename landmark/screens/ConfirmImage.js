import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import SvgComponent1 from "../svg/SvgComponent1";
import SvgComponent2 from "../svg/SvgComponent2";
import SvgComponent3 from "../svg/SvgComponent3";
import * as tf from "@tensorflow/tfjs";
import {
  fetch,
  decodeJpeg,
  bundleResourceIO,
} from "@tensorflow/tfjs-react-native";
import * as jpeg from "jpeg-js";

function ConfirmImage({ route, navigation }) {
  const { photoUrl, base64 } = route.params;
  // console.log(base64);

  const imageToTensor = (rawImageData) => {
    const TO_UINT8ARRAY = true;
    let { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY);
    // Drop the alpha channel info for mobilenet
    data = tf.image.resize(data, [224, 224]);
    const buffer = new Uint8Array(width * height * 3);
    let offset = 0; // offset into original data
    for (let i = 0; i < buffer.length; i += 3) {
      buffer[i] = data[offset];
      buffer[i + 1] = data[offset + 1];
      buffer[i + 2] = data[offset + 2];

      offset += 4;
    }

    return tf.tensor3d(buffer, [height, width, 3]);
  };

  const getResult = async () => {
    // console.log(photoUrl);
    const prediction = "Eiffel Tower";
    console.log("Starting prediction...");
    let name = "";

    try {
      let googleVisionRes = await fetch(
        "https://vision.googleapis.com/v1/images:annotate?key=" +
          "ENTER GOOGLE CLOUD API KEY",
        {
          method: "POST",
          body: JSON.stringify({
            requests: [
              {
                image: {
                  content: base64,
                },
                features: [{ type: "LANDMARK_DETECTION", maxResults: 5 }],
              },
            ],
          }),
        }
      );
      let json = await googleVisionRes.json();
      // const { image, info, name, wiki } = json;
      try {
        name = json["responses"][0]["landmarkAnnotations"][0]["description"];
      } catch (error) {
        navigation.navigate("ResultsScreen", {
          name: "No Data Available",
          image:
            "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
          text: "No information available",
          url: "https://google.com",
        });
        return;
      }
    } catch (error) {
      navigation.navigate("ResultsScreen", {
        name: "No Data Available",
        image:
          "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
        text: "No information available",
        url: "https://google.com",
      });
      return;
    }

    console.log(name);

    try {
      let response = await fetch(
        "https://landmarkapp-backend.herokuapp.com/monuments",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
          }),
        }
      );
      let json = await response.json();
      console.log(json);
      let { image, text, url } = json;
      if (name === "Colosseum") {
        image =
          "https://images.unsplash.com/photo-1561865406-3b94c2e383c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80";
      }
      if (name === "Eiffel Tower") {
        image =
          "https://images.unsplash.com/photo-1508051306307-b36f794302a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2306&q=80";
      }
      if (json["url"]) {
        navigation.navigate("ResultsScreen", {
          name,
          image,
          text,
          url,
        });
      }
    } catch (error) {
      console.error(error);
    }

    // await tf.ready();

    // Get reference to bundled model assets
    // const modelJson = require("../assets/model.json");
    // const modelWeights = require("../assets/weights.bin");

    // const model = await tf.loadLayersModel(
    //   bundleResourceIO(modelJson, modelWeights)
    // );

    // console.log(model.summary());

    try {
      // const uri =
      //   "https://www.history.com/.image/c_fill%2Ccs_srgb%2Cfl_progressive%2Ch_400%2Cq_auto:good%2Cw_620/MTU3ODc4NjAzNTM2MTQ4MTkx/hith-eiffel-tower-istock_000016468972large-2.jpg";
      // const response = await fetch(uri, {}, { isBinary: true });
      // const rawImageData = await response.arrayBuffer();
      // const imageTensor = imageToTensor(rawImageData);
      // const predictions = await model.predict(imageTensor);
      // console.log("Hello");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <ImageBackground style={styles.image} source={{ uri: photoUrl }} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.registerButton} onPress={getResult}>
            <Text style={styles.registerText}>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate("CameraScreen")}
          >
            <Text style={styles.registerText}>Retake</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    top: 60,
    borderRadius: 20,
    height: 700,
  },
  buttonContainer: {
    top: 40,
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
    marginVertical: 20,
  },
  image: {
    width: 350,
    height: 350,
  },
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#F8FAFB",
  },
});

export default ConfirmImage;
