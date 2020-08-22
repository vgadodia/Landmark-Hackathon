import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ImageScreen from "../screens/ImageScreen";
import RegisterScreen from "../screens/RegisterScreen";
import MessagesScreen from "../screens/MessagesScreen";
// import routes from "./routes";
import navigation from "./rootNavigation";
import ImageNavigator from "./ImageNavigator";
import NearbyResultsButton from "./NearbyResultsButton";
import CameraButton from "./CameraButton";
import AccountButton from "./AccountButton";
// import useNotifications from "../hooks/useNotifications";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Camera"
        component={ImageNavigator}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <CameraButton onPress={() => navigation.navigate("Camera")} />
          ),
        })}
      />
      <Tab.Screen
        name="Nearby"
        component={MessagesScreen}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <NearbyResultsButton
              onPress={() => navigation.navigate("Nearby")}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Account"
        component={RegisterScreen}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <AccountButton onPress={() => navigation.navigate("Account")} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
