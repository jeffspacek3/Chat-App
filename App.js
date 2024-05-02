// Import Screens
import Start from "./components/Start";
import Chat from "./components/Chat";

// Import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Database
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { useState, useEffect } from "react";
import { Logbox, Alert } from "firebase/storage";

//Creat the Navigator
const Stack = createNativeStackNavigator();

const App = () => {
  const [text, setText] = useState("");

  // Your web app's Firebase configuration
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
          {(props) => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
