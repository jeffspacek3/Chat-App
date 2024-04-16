// Import Screens
import Start from "./components/Start";
import Chat from "./components/Chat";

// Import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useState } from "react";

//delete later
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from "react-native";
//delete later

const Stack = createNativeStackNavigator();

const App = () => {
  const [text, setText] = useState("");

  // alert the user input (`text` state's value)
  const alertMyText = () => {
    Alert.alert(text);
  };
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
