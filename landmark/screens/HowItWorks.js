import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import SvgComponent1 from "../svg/SvgComponent1";
import SvgComponent2 from "../svg/SvgComponent2";
import SvgComponent3 from "../svg/SvgComponent3";

function HowItWorks(props) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>How it works</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.subBody1}>
          <View
            style={[styles.box, { backgroundColor: "rgba(234, 118, 93,0.3)" }]}
          >
            <View style={styles.svg}>
              <SvgComponent1 />
            </View>
          </View>
        </View>
        <View style={styles.subBody2}>
          <Text style={styles.text}>Take or upload a photo.</Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.subBody1}>
          <View
            style={[styles.box, { backgroundColor: "rgba(234, 118, 93,0.3)" }]}
          >
            <View style={styles.svg}>
              <SvgComponent2 />
            </View>
          </View>
        </View>
        <View style={styles.subBody2}>
          <Text style={styles.text}>See instant results.</Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.subBody1}>
          <View
            style={[styles.box, { backgroundColor: "rgba(234, 118, 93,0.3)" }]}
          >
            <View style={styles.svg}>
              <SvgComponent3 />
            </View>
          </View>
        </View>
        <View style={styles.subBody2}>
          <Text style={styles.text}>Find nearby sites to explore.</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.registerText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
    top: 40,
    alignSelf: "center",
  },
  svg: {
    opacity: 1,
  },
  box: {
    width: 160,
    height: 145,
    left: 10,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Avenir",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    right: 10,
  },
  subBody1: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  subBody2: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  body: {
    backgroundColor: "transparent",
    flex: 0.2,
    flexDirection: "row",
    marginVertical: 10,
  },
  container: {
    flex: 1,
    top: 10,
  },
  titleContainer: {
    flex: 0.15,
    marginTop: 40,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 50,
    fontWeight: "bold",
  },
});

export default HowItWorks;
