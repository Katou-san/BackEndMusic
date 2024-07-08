const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");
const { getAuth } = require("firebase/auth");
const { getStorage } = require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyC2DWg1HRFam68LzphTTzInPpcPC0daX14",
  authDomain: "file-data-music.firebaseapp.com",
  projectId: "file-data-music",
  storageBucket: "file-data-music.appspot.com",
  messagingSenderId: "655486755719",
  appId: "1:655486755719:web:5a0d3e7a63b11350d22922",
  measurementId: "G-4MQLWCYHQB",
};

const app = initializeApp(firebaseConfig);
const firebaseStore_Config = getStorage(app);
const auth = getAuth(app);

module.exports = { auth, firebaseStore_Config };
// npm install firebase
// npm install -g firebase-tools

// firebase login

// firebase init

// firebase deploy
