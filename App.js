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

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  //initialize /clooud Firestore and get a reference to the service

  const firebaseConfig = {
    apiKey: 'YOU_API_KEY',
    authDomain: 'YOUR_APP_DOMAIN',
    projectId: 'YOUR_APP_ID',
    storageBucket: 'YOUR_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_SENDER_ID',
    appId: 'YOUR_APP_ID',
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
