import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyDtoLk-xD8WU5I5mphw_89ADCUhAjzWXQY",
  authDomain: "cybershield-f0c4f.firebaseapp.com",
  projectId: "cybershield-f0c4f",
  storageBucket: "cybershield-f0c4f.firebasestorage.app",
  messagingSenderId: "999383873024",
  appId: "1:999383873024:web:ff00a267326c7205b98ae5"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };