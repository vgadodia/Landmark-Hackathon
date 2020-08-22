import React from "react";
import { Text, StyleSheet, Platform, Modal } from "react-native";

function AppText({ children, style, ...otherProps }) {
  return (
    <View>
      <Modal>
        <Text style={[styles.text, style]} {...otherProps}>
          {children}
        </Text>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
});

export default AppText;
