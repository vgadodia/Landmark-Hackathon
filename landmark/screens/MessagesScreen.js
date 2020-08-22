import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Linking,
} from "react-native";

import Screen from "../components/Screen";
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../components/lists";
import useLocation from "./useLocation";
import * as Location from "expo-location";

let initialMessages = [
  {
    description: "0.0 mi away",
    id: 1,
    image:
      "https://images-na.ssl-images-amazon.com/images/I/71sKzRQtXtL._AC_UL600_SR600,600_.png",
    link: "https://www.google.com/search?q=Bunker Hill Monument",
    maps:
      "https://www.google.com/maps/search/?api=1&query=42.376340,-71.060774",
    title: "Example 1",
  },
  {
    description: "0.0 mi away",
    id: 2,
    image:
      "https://images-na.ssl-images-amazon.com/images/I/71sKzRQtXtL._AC_UL600_SR600,600_.png",
    link: "https://www.google.com/search?q=Soldiers and Sailors Monument",
    maps:
      "https://www.google.com/maps/search/?api=1&query=42.355454,-71.066409",
    title: "Example 2",
  },
];

let finalMessages = [
  {
    description: "1.2 mi away",
    id: 1,
    image:
      "https://interactive.wttw.com/sites/default/files/Monuments_1_wide-shot_Hennessey.jpg",
    link: "https://www.google.com/search?q=Bunker Hill Monument",
    maps:
      "https://www.google.com/maps/search/?api=1&query=42.376340,-71.060774",
    title: "Bunker Hill Monument",
  },
  {
    description: "2.2 away",
    id: 2,
    image:
      "https://media-cdn.tripadvisor.com/media/photo-s/10/90/51/6e/soldiers-sailors-monument.jpg",
    link: "https://www.google.com/search?q=Soldiers and Sailors Monument",
    maps:
      "https://www.google.com/maps/search/?api=1&query=42.355454,-71.066409",
    title: "Soldiers and Sailors Monument",
  },
  {
    description: "2.4 mi away",
    id: 3,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/66/Ether_Monument_Overview.JPG",
    link: "https://www.google.com/search?q=Ether Monument",
    maps:
      "https://www.google.com/maps/search/?api=1&query=42.354822,-71.071422",
    title: "Ether Monument",
  },
  {
    description: "3.3 mi away",
    id: 4,
    image: "https://live.staticflickr.com/7250/7658022350_6df0afd547_b.jpg",
    link: "https://www.google.com/search?q=Boston Women's Memorial",
    maps:
      "https://www.google.com/maps/search/?api=1&query=42.350478,-71.083356",
    title: "Boston Women's Memorial",
  },
  {
    description: "3.9 mi away",
    id: 5,
    image:
      "https://www.boston-discovery-guide.com/image-files/800-boston-massacre-memorial-common-5x4.jpg",
    link: "https://www.google.com/search?q=Soldiers Memorial",
    maps:
      "https://www.google.com/maps/search/?api=1&query=42.309394,-71.115822",
    title: "Soldiers Memorial",
  },
  {
    description: "4.5 mi away",
    id: 6,
    image:
      "https://t0.gstatic.com/images?q=tbn:ANd9GcT-IEWSlDw3kAu9NROnwF8wslo7pgYwu0iQ2eFuOArwRC5p4oB8mESdMzayW4IltyaSNkOyelwhAI4IhQ",
    link: "https://www.google.com/search?q=Old State House",
    maps:
      "https://www.google.com/maps/search/?api=1&query=42.358729,-71.057460",
    title: "Old State House",
  },
];

function MessagesScreen(props) {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);
  // let location = useLocation();

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestPermissionsAsync();
      if (!granted) return;
      const {
        coords: { latitude, longitude },
      } = await Location.getLastKnownPositionAsync();
      return { latitude, longitude };
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // getResult();
    console.log("Hello");
  }, []);

  const getResult = async () => {
    const prediction = "Eiffel Tower";
    const { latitude, longitude } = await getLocation();
    console.log(latitude, longitude);
    try {
      let response = await fetch(
        "https://landmarkapp-backend.herokuapp.com/maps",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lat: latitude,
            lon: longitude,
          }),
        }
      );
      let json = await response.json();
      let arr = [];
      arr.push(json["first"]);
      arr.push(json["second"]);
      arr.push(json["third"]);
      arr.push(json["fourth"]);
      arr.push(json["fifth"]);
      arr.push(json["sixth"]);
      console.log(arr);
      setMessages(arr);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (message) => {
    // Delete the message from messages
    setMessages(messages.filter((m) => m.id !== message.id));
  };

  return (
    <Screen>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Explore</Text>
      </View>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={getResult}
      >
        <Text style={styles.registerText}>Get Nearby Landmarks</Text>
      </TouchableOpacity>
      <View style={styles.listings}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={messages}
          keyExtractor={(message) => message.id.toString()}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              subTitle={item.description}
              image={item.image}
              link={item.link}
              maps={item.maps}
              onPress={() => Linking.openURL(item.link)}
            />
          )}
          refreshing={refreshing}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  listings: {
    flex: 1,
    padding: 30,
    backgroundColor: "transparent",
    top: 10,
  },
  titleContainer: {
    flex: 0.2,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: "Avenir",
  },
  registerText: {
    fontFamily: "Avenir",
    fontSize: 20,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    textAlignVertical: "center",
  },
  registerButton: {
    backgroundColor: "#EA765D",
    width: 270,
    height: 65,
    borderRadius: 7,
    justifyContent: "center",
    alignSelf: "center",
    top: 5,
  },
});

export default MessagesScreen;
