import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from '@firebase/firestore';

window.navigator.userAgent = "ReactNative";

// Initialize Firebase
window.navigator.userAgent = "ReactNative";
const firebaseConfig = {
  apiKey: "AIzaSyDoPCcx9Hi67FgG-kAQQ1UXvtFa9uyHn1k",
  authDomain: "toreach2-5ad74.firebaseapp.com",
  projectId: "toreach2-5ad74",
  storageBucket: "toreach2-5ad74.appspot.com",
  messagingSenderId: "587606023475",
  appId: "1:587606023475:web:a9d0aa9be1684dfb117246",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const db = getFirestore(app);

export { app, auth, db };
