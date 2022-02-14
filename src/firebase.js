import { initializeApp } from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDdP7sqRWR4YUOhnhxkQQPVYT20bxxlO1M",
  authDomain: "abilnfs-twitter.firebaseapp.com",
  projectId: "abilnfs-twitter",
  storageBucket: "abilnfs-twitter.appspot.com",
  messagingSenderId: "439659969173",
  appId: "1:439659969173:web:19700631b32b24895c399c",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

if (process.env.NODE_ENV === "development") {
  console.log("dev environment, connecting to emulators");
  connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true });
  connectFirestoreEmulator(db, "localhost", 8080);
  connectStorageEmulator(storage, "localhost", 9199);
}

function getAtName(user) {
  return "@" + user.displayName.replace(/ /g, "");
}

export { app, auth, storage, db, getAtName };
