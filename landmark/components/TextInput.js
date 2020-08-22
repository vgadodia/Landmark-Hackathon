import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, TextInput, StyleSheet, Platform } from "react-native";

import colors from "../config/colors";

function AppTextInput({ icon, width = "100%", ...otherProps }) {
  return (
    <View style={[styles.container, { width }]}>
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
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    color: colors.dark,
    flex: 1,
  },
});

export default AppTextInput;
