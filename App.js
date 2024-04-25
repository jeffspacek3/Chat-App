// Import Screens
import Start from "./components/Start";
import Chat from "./components/Chat";
import CustomActions from "./components/CustomActions";

// Database
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useState } from "react";

//Creat the Navigator
const Stack = createNativeStackNavigator();

const App = () => {
  const [text, setText] = useState("");
  const firebaseConfig = {};

  //Initizlize Firebase
  const app = initializeApp(firebaseConfig);

  //initialize /clooud Firestore and get a reference to the service
  //const db = getFirestore(app);

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
