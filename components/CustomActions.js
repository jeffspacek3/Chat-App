// Import React
import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Button,
  Image,
  Alert,
} from "react-native";

// Import Expo Customization
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import { useActionSheet } from "@expo/react-native-action-sheet";

const CustomActions = ({ wrapperStyle, iconTextStyle, onSend }) => {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);

  //return a reference (object) to Gifted Chat's ActionSheet
  const actionSheet = useActionSheet();

  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissions?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync();

      if (!result.canceled) setImage(result.assets[0]);
      else setImage(null);
    }
  };

  const takePhoto = async () => {
    let permissions = await ImagePicker.requestCameraPermissionsAsync();

    if (permissions?.granted) {
      let result = await ImagePicker.launchCameraAsync();

      if (!result.canceled) setImage(result.assets[0]);
      else setImage(null);
    }
  };

  const getLocation = async () => {
    let permissions = await Location.requestForegroundPermissionsAsync();
    if (permissions?.granted) {
      const location = await Location.getCurrentPositionAsync({});
      if (location) {
        console.log(location)
        onSend({
          location: {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
          },
        });
      } else Alert.alert("Error occurred while fetching location!");

      setLocation(location);
    } else {
      Alert.alert("Permissions to read location aren't granted.");
    }
  };

  //display a menu with options (take photo, select photo, share location)
  const onActionPress = () => {
    const options = [
      "Choose From Library",
      "Take a Picture",
      "Send Location",
      "Cancel",
    ];
    const cancelButtonIndex = options.length - 1;
    actionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            console.log("user wants to pick an image");
            pickImage();
            return;
          case 1:
            console.log("user wants to take a photo");
            takePhoto();
            return;
          case 2:
            console.log("user wants to get their location");
            getLocation();
          default:
        }
      }
    );
  };

  return (

    //older code needs updated
    <View style={styles.container}>
      <Button onPress={getLocation} title="Get MY LOCATION" />
      <Button onPress={pickImage} title="PICK AN IMAGE FROM THE LIBRARY" />
      <Button onPress={takePhoto} title="OPEN CAMERA" />
      {location && (
        <MapView
          style={{ width: 300, height: 200 }}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      )}
      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ width: 200, height: 200 }}
        />
      )}
    </View>
  );
};

// Stylesheet
const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    MarginBottom: 10,
    flex: 1,
    justifyContent: "center",
  },
  wrapper: {
    borderRaduis: 13,
    borderColor: "#b2b2b2",
    borderWidth: 2,
    flex: 1,
    justifyConten: "center",
  },
  iconText: {
    color: "#b2b2b2",
    fontWeight: "bold",
    fontSize: 15,
    backgroundColor: "transparent",
    textAlign: "center",
  },
});

export default CustomActions;
