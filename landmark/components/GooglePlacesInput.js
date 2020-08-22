import React, { useState } from "react";
import { Image, Text, StyleSheet, View, ScrollView } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Ionicons } from "@expo/vector-icons";

const GOOGLE_API_KEY = "AIzaSyBG0LhFyJxS1D5uczBuNo4YDT9b7q7U0ig";

const GooglePlacesInput = ({ handleCoordinates, handleSetError }) => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Enter Location"
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        handleCoordinates(details["geometry"]["location"]);
      }}
      // onSubmitEditing={(data) => console.log(data["nativeEvent"]["text"])}
      query={{
        key: GOOGLE_API_KEY,
        language: "en",
      }}
      fetchDetails={true}
      onNotFound={() => handleSetError("An unknown error occured.")}
      onFail={() => handleSetError("An unknown error occured.")}
      styles={{
        container: {
          flex: 1,
        },
        textInputContainer: {
          marginLeft: -10,
          marginBottom: 20,
          padding: 10,
          backgroundColor: "white",
          borderTopWidth: 0,
          borderBottomWidth: 0,
        },
        listView: {
          marginLeft: 0,
        },
        textInput: {
          height: 45,
          marginLeft: 0,
          marginRight: -10,
          color: "#5d5d5d",
          fontSize: 18,
          backgroundColor: "#e7eff6",
        },
        poweredContainer: {
          display: "none",
        },
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default GooglePlacesInput;
