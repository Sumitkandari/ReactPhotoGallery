 // Import the functions you need from the SDKs you nee
// import { firebase} from 'firebase/app';
 
 
//  import 'firebase/storage'; 
//  import 'firebase/firestore';

 import { initializeApp } from 'firebase/app';
 import {getStorage} from 'firebase/storage';
 import { getFirestore } from "firebase/firestore";
 import {getAuth} from 'firebase/auth'
 const firebaseConfig = {
   apiKey: import.meta.env.VITE_APP_API_KEY,
   authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
   projectId: import.meta.env.VITE_APP_PROJECT_ID,
   storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
   messagingSenderId: import.meta.env.VITE_APP_MESSAGE_SENDER_ID,
   appId: import.meta.env.VITE_APP_ID
 };

 // Initialize Firebase
initializeApp(firebaseConfig);

const projectStorage=getStorage();
// const projectFirestore=firebase.firestore();
const projectFireStore = getFirestore();
const projectAuth=getAuth();

export {projectStorage,projectFireStore,projectAuth};