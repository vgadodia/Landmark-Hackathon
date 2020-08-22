import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Linking,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";

import Text from "../Text";
import colors from "../../config/colors";

function ListItem({
  title,
  subTitle,
  image,
  IconComponent,
  onPress,
  link,
  maps,
}) {
  return (
    <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
      <View style={styles.container}>
        {IconComponent}
        {/* {image && <Image style={styles.image} source={{ uri: image }} />} */}
        <View style={styles.image}>
        <MaterialCommunityIcons name="map-marker-radius" color={"white"} size={50}  />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {subTitle && (
            <Text style={styles.subTitle} numberOfLines={1}>
              {subTitle}
            </Text>
          )}
          <View style={styles.infoButtons}>
            <TouchableOpacity
              style={styles.learnMore}
              onPress={() => Linking.openURL(link)}
            >
              <Text style={styles.mapsText}>Learn More</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.maps}
              onPress={() => Linking.openURL(maps)}
            >
              <Text style={styles.mapsText}>Maps</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  learnMore: {
    backgroundColor: "#EA765D",
    justifyContent: "center",
    alignItems: "center",
    top: 10,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  mapsText: {
    fontFamily: "Avenir",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  maps: {
    backgroundColor: "#4D8AF0",
    justifyContent: "center",
    alignItems: "center",
    top: 10,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    left: 10,
  },
  infoButtons: {
    flexDirection: "row",
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    borderRadius: 12,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
    left: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#4D8AF0',
    justifyContent: 'center',
    alignItems: 'center',
    left: 5,
  },

  subTitle: {
    color: colors.medium,
  },
  title: {
    fontWeight: "500",
    fontSize: 16,
  },
});

export default ListItem;
