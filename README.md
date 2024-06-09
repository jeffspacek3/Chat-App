# Chat App
## Project Description
A Chat App for bile devices using React Natvie. The app provides users with a chat interface and options to share images, audios and location.

## Dependencies
* React native: Framework for building mobile applications using JavaScript and React
* Expo: Development platform for building React Native applications
* GiftedChat: A library for creating chat interfaces in React Native applications
* Google Firebase: Cloud-based platform that provides various services, including Firestore for reat-time database and authentication
* AsyncStorage: Local storage system in React natvie for caching and persisting data
* Expo MediaLibrary: Expo API for accessing and managing media assets on the device
* Expo ImagePicker: Expo API for accessing the device's image picker to choose images from the gallery
* Expo Location: Expo API for obtaining location information from a device
* React-Native-Maps: React Native Map components for iOS and Andriod
* MapView: Specific component from the reat-native-maps library used to display maps in React Native applications

## Features
* Users can enter their name and choose a background color for the chat screen before joining the chat
* Send and receive messages
* Send and receive images (from media library or device's camera)
* Send and receive locations
* Record, send and receive audio
* Users can view previous messages when offline

## Set up this app
* Clone this repository
* Navigate to the chat-app folder and run ``` npm install ```
* Set up Firebaser for your project:
    * Sign in at Google Firebase
    * Create a project
    * Set up Firestore Database (production mode)
    * Adjust rules from ``` allow read, write: if false; ``` to ``` allow read, write: if true; ```
    * Register app(</>) in Project Overview
    * Navigate to the chat-app folder and install the Firebase using ``` npm install firebase ```
    * Initialize Firebase by copying and pasting the provided Firebase configuration into the App.js
  * Download Android Studio on your computer or use the Expo Go App on your mobile device
  *  Run ``` expo start ```
