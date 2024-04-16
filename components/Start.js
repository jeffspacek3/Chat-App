import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

// Define the Start Component
const Start = ({ navigation }) => {
  // State to hold the name input value
  const [name, setName] = useState("");
  //State to hold the chosen background color
  const [background, setBackground] = useState("");
  const onPress = () => setCount((prevCount) => prevCount + 1);

  // handle the sign-in anonymously process for the user.
  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate("Chat", {
          name: name,
          background: background,
          userID: result.user.uid,
        });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    textInput: {
      width: "88%",
      padding: 15,
      borderWidth: 1,
      marginTop: 15,
      marginBottom: 15,
      height: 50,
    },
    textDisplay: {
      height: 50,
      lineHeight: 50,
    },
    button: {
      alingItems: "center",
      backgroundColor: "#757083",
      fontSize: "16",
      fontWeight: "600",
      fontColor: "#FFFFFF",
      padding: 10,
    },
    imageBackground: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
    },
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../img/background_image.png")}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <Text>Welcome to Chat-App</Text>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder="Your Name"
        />
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text>Start Chatting</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default Start;
