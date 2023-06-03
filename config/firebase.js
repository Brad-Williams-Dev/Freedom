import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import Constants from 'expo-constants';

// const firebaseConfig = {
//   apiKey: Constants.manifest.extra.firebaseApiKey,
//   authDomain: Constants.manifest.extra.firebaseAuthDomain,
//   databaseURL: Constants.manifest.extra.firebaseDatabaseUrl,
//   projectId: Constants.manifest.extra.firebaseProjectId,
//   storageBucket: Constants.manifest.extra.firebaseStorageBucket,
//   messagingSenderId: Constants.manifest.extra.firebaseMessagingSenderId,
//   appId: Constants.manifest.extra.firebaseAppId,
// };

const firebaseConfig = {
  apiKey: "AIzaSyAI4WS30QPatE6329UMTh73tuGP9kBIFqk",
  authDomain: "freedom-7c074.firebaseapp.com",
  projectId: "freedom-7c074",
  storageBucket: "freedom-7c074.appspot.com",
  messagingSenderId: "626553331158",
  appId: "1:626553331158:web:01fc3be3caa3c289341877"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { database, auth };