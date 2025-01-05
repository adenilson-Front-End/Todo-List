import { getFirestore } from "firebase/firestore";

import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyDbkZfYgTWEmz5_K5SmH2jRhLGE3pqpAUQ",
    authDomain: "todolist-587f2.firebaseapp.com",
    projectId: "todolist-587f2",
    storageBucket: "todolist-587f2.firebasestorage.app",
    messagingSenderId: "161331094558",
    appId: "1:161331094558:web:6f672d0f11173b3c35ba0f"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

