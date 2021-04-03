import * as firebase from "firebase";
require("@firebase/firestore");
const firebaseConfig = {
  apiKey: "AIzaSyCQYcLonQ9L_zGTRmKMUT1cFuRq_6aFj_k",
  authDomain: "story-hub-28d59.firebaseapp.com",
  projectId: "story-hub-28d59",
  storageBucket: "story-hub-28d59.appspot.com",
  messagingSenderId: "673656866421",
  appId: "1:673656866421:web:738d5604aa0f08f6025a3c"
};
firebase.initializeApp(firebaseConfig);
export default firebase.firestore();
//export default firebase.firebaseConfig;