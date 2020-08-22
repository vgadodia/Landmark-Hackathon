import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, TextInput, StyleSheet, Platform, Text } from "react-native";

import colors from "../config/colors";

function AppTextInput({ icon, width = "100%", style, ...otherProps }) {
  return (
    <View style={[styles.container, { width }, style]}>
      <TextInput
        placeholderTextColor={"#798497"}
        style={styles.input}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EAEAEA",
    borderRadius: 12,
    flexDirection: "row",
    padding: 15,
  },
  input: {
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    color: colors.dark,
    flex: 1,
    lineHeight: 21,
    top: 3,
  },
});

export default AppTextInput;
