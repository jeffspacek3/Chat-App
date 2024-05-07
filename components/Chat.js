
// Import React, React Native,
import { useEffect, useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase Database
import {
  onSnapshot,
  query,
  collection,
  addDoc,
  orderBy,
} from "firebase/firestore";

// Import Compenents
import CustomActions from "./CustomActions";

// Destructure Name and Background From route.params
const Chat = ({ route, navigation, db, isConnected, storage }) => {
  const { name, background, userID } = route.params;
  const [messages, setMessages] = useState([]);
  letsoundObject = null;

  let unsubMessages;

  useEffect(() => {
    navigation.setOptions({ title: name });

    if (isConnected == true) {
      // unregister current onSnapshot() listener to avoid registering multiple listeners when
      // useEffect code is re-executed.
      if (unsubMessages) unsubMessages();
      unsubmessages = null;

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
        cacheMessages(newMessages);
      });
    } else {
      loadCachedMessages();
    }

    // Code Clean Up
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);
  // isconnected is used as a dependency value and will allow the component to call the callback of useEffect whenewer the isConnected prop's value changes.

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
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
            backgroundColor: "#FFF",
          },
        }}
      />
    );
    const renderCustomActions = (props) => {
      return <CustomActions storage={storage} {...props} userID={userID} />;
    };
  };

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <GiftedChat
        renderInputToolbar={renderInputToolbar}
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
