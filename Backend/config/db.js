const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getStorage } = require("firebase/storage");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyDpyI081AdMlH9lo9Si3Bt6RV-SLsUX4bU",
  authDomain: "filexerox.firebaseapp.com",
  projectId: "filexerox",
  storageBucket: "filexerox.firebasestorage.app",
  messagingSenderId: "782102170326",
  appId: "1:782102170326:web:859fe43296faeb81021777",
  measurementId: "G-FW4LYQ72X5"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
// const auth = getAuth(app); // Optional if needed

module.exports = { db, storage };
