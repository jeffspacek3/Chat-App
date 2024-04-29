import { useEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import {
  onSnapshot,
  query,
  collection,
  addDoc,
} from "firebase/firestore";
import CustomActions from "./CustomActions";

const Chat = ({ route, navigation }) => {
  const { name } = route.params;
  const [messages] = useState([]);

  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  useEffect(() => {
    navigation.setOptions({ title: name });
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

// Subscribe to changes in the "messages" collection using onSnapshot.
      // This function will be called whenever there are changes in the collection.
      unsubMessages = onSnapshot(q, (documentsSnapshot) => {
        // Initialize an empty array to store the new messages
        let newMessages = [];
        // Iterate through each document in the snapshot
        documentsSnapshot.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });

         const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  }, []);

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
      {Platform.OR === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
})};

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
