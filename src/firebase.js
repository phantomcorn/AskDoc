
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVvLfcvruGRlTQiZKCv3FxI4GJZY3lVso",
  authDomain: "askdoc-74ffc.firebaseapp.com",
  projectId: "askdoc-74ffc",
  storageBucket: "askdoc-74ffc.appspot.com",
  messagingSenderId: "351125360892",
  appId: "1:351125360892:web:34d4fbbce4957b20fec779",
  measurementId: "G-XN9JB01K1K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db  = getFirestore(app);