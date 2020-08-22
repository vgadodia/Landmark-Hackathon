import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ImageScreen from "../screens/ImageScreen";
import CameraScreen from "../screens/CameraScreen";
import ConfirmImage from "../screens/ConfirmImage";
import ResultsScreen from "../screens/ResultsScreen";
import ConfirmLibraryImage from "../screens/ConfirmLibraryImage";

const Stack = createStackNavigator();

const ImageNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ImageScreen" component={ImageScreen} />
    <Stack.Screen name="CameraScreen" component={CameraScreen} />
    <Stack.Screen name="ConfirmImage" component={ConfirmImage} />
    <Stack.Screen name="ResultsScreen" component={ResultsScreen} />
    <Stack.Screen name="ConfirmLibraryImage" component={ConfirmLibraryImage} />
  </Stack.Navigator>
);

export default ImageNavigator;
