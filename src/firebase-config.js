/**
 * To find your Firebase config object:
 *
 * 1. Go to your [Project settings in the Firebase console](https://console.firebase.google.com/project/_/settings/general/)
 * 2. In the "Your apps" card, select the nickname of the app for which you need a config object.
 * 3. Select Config from the Firebase SDK snippet pane.
 * 4. Copy the config object snippet, then add it here.
 */
const firebaseConfig = {
  apiKey: "AIzaSyBTz4R0Yu1js0JZF6akixIB87Ckujk5WYE",
  authDomain: "to-do-list-6d6f9.firebaseapp.com",
  projectId: "to-do-list-6d6f9",
  storageBucket: "to-do-list-6d6f9.appspot.com",
  messagingSenderId: "894553572495",
  appId: "1:894553572495:web:92d5b687fa2b355d0bdcfa",
};

export function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error(
      "No Firebase configuration object provided." +
        "\n" +
        "Add your web app's configuration object to firebase-config.js"
    );
  } else {
    return config;
  }
}
