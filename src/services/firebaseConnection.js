import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { initializeApp } from "firebase/app";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
const firebaseConfig = {
    apiKey: "AIzaSyA6x51CPgMjvKZ19wfBDsUbyFiwX0ncPIM",
    authDomain: "todolist-fc583.firebaseapp.com",
    projectId: "todolist-fc583",
    storageBucket: "todolist-fc583.firebasestorage.app",
    messagingSenderId: "531426644441",
    appId: "1:531426644441:web:494cd9506ccd80f3aac9c8"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})


export { db, auth };

