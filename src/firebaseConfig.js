import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from '@firebase/firestore';

window.navigator.userAgent = "ReactNative";

// Initialize Firebase
window.navigator.userAgent = "ReactNative";
const firebaseConfig = {
    apiKey: "AIzaSyDGGIS4Pky6s69yJTm6KnotLZkQvnskmgE",
    authDomain: "toreach-32a88.firebaseapp.com",
    projectId: "toreach-32a88",
    storageBucket: "toreach-32a88.appspot.com",
    messagingSenderId: "963588212263",
    appId: "1:963588212263:web:5fcbe3e6d691e612693002"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const db = getFirestore(app);

export { app, auth, db };
