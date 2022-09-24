/**
 * To find your Firebase config object:
 * 
 * 1. Go to your [Project settings in the Firebase console](https://console.firebase.google.com/project/_/settings/general/)
 * 2. In the "Your apps" card, select the nickname of the app for which you need a config object.
 * 3. Select Config from the Firebase SDK snippet pane.
 * 4. Copy the config object snippet, then add it here.
 */
const config = {
  apiKey: "AIzaSyDjg33skHv_fSjWjZSfxesoM6JEusTyD18",
  authDomain: "friendlychat-483ef.firebaseapp.com",
  projectId: "friendlychat-483ef",
  storageBucket: "friendlychat-483ef.appspot.com",
  messagingSenderId: "656537584123",
  appId: "1:656537584123:web:4c10f6b1a103277cbfcb5e"
  /* TODO: ADD YOUR FIREBASE CONFIGURATION OBJECT HERE */
};

export function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error('No Firebase configuration object provided.' + '\n' +
    'Add your web app\'s configuration object to firebase-config.js');
  } else {
    return config;
  }
}