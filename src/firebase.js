
import { initializeApp } from "firebase/app";
import { onValue, getDatabase,ref, set,get, update, remove,child } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDVvLfcvruGRlTQiZKCv3FxI4GJZY3lVso",
  authDomain: "askdoc-74ffc.firebaseapp.com",
  databaseURL: "https://askdoc-74ffc-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "askdoc-74ffc",
  storageBucket: "askdoc-74ffc.appspot.com",
  messagingSenderId: "351125360892",
  appId: "1:351125360892:web:34d4fbbce4957b20fec779",
  measurementId: "G-XN9JB01K1K"
};

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db  = getDatabase(app);
export default db;



export function writeDB(title, description) {
  set(ref(db, 'Threads/' + title), {
    description : description
  }).then(() => {alert("Submitted")})
    .catch((error) => {alert(error)});
}


export function readThreadsDB() {

  let res = [];
  const dbRef = ref(db, 'Threads');
  onValue(dbRef, (snapshot) => {
    snapshot.forEach((snap) => {
    let keyName = snap.key;
    let data = snap.val();
    res.push({"key" : keyName, "data" : data});
    })
  })
  return res;
}





