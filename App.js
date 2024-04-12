import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from "react-native";

// import the screens
import Screen1 from "./components/Screen1";
import Screen2 from "./components/Screen2";

// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  const [text, setText] = useState("");

  // alert the user input (`text` state's value)
  const alertMyText = () => {
    Alert.alert(text);
  };
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Screen1">
        <Stack.Screen name="Screen1" component={Screen1} />
        <Stack.Screen name="Screen2" component={Screen2} />
      </Stack.Navigator>
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={setText}
          placeholder="Type Something Here"
        />
        <Text style={styles.textDisplay}>You wrote: {text}</Text>
        <Button
          onPress={() => {
            alertMyText();
          }}
          title="Press Me"
        />
        <ScrollView>
          <Text style={{ fontSize: 110 }}>
            This text is so big! And so long! You have to scroll!
          </Text>
        </ScrollView>
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    width: "88%",
    borderWidth: 1,
    height: 50,
    padding: 10,
  },
  textDisplay: {
    height: 50,
    lineHeight: 50,
  },
});

export default App;
