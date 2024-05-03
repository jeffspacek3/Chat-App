// Import Components
import Start from "./components/Start";
import Chat from "./components/Chat";

// Import React and Navigation
import { useState, useEffect } from "react";
import { LogBox, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";

// Firebase Database
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { getStorage } from "firebase/storage";

//Import NetInfo and Network Connection
import { useNetInfo } from "@react-native-community/netinfo";

//Create the Navigator
const Stack = createNativeStackNavigator();

const App = () => {
  const [text, setText] = useState("");
  const connectionStatus = useNetInfo();
  
  //NetInfo for Detecting a Network Connection
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  // Web App's Firebase Configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBWfvWbXQGAT-UB6nps9l3Y3ITMxPu-kUw",
    authDomain: "chatapp-b8f05.firebaseapp.com",
    projectId: "chatapp-b8f05",
    storageBucket: "chatapp-b8f05.appspot.com",
    messagingSenderId: "845432723514",
    appId: "1:845432723514:web:c5cd302987c8a8daa63d03",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => 
          <Chat
          isConnected={connectionStatus.isConnected}
          db={db}
          {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
