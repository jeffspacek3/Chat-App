import { useEffect, useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import CustomActions from "./CustomActions";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import {
  onSnapshot,
  query,
  collection,
  addDoc,
  orderBy,
} from "firebase/firestore";

const Chat = ({ route, navigation }) => {
  const { name } = route.params;
  const [messages] = useState([]);

  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#484848",
          },
          left: {
            backgroundColor: "#fff",
          },
        }}
      />
    );
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
      setMessages(newMessages);
    });
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userID,
          name: name,
        }}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
