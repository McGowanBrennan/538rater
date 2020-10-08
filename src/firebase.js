
import firebase from "firebase/app"
import 'firebase/analytics';
import "firebase/firestore"
import "firebase/database"

var firebaseConfig = {
    apiKey: "AIzaSyB1IC7cv_90249ZS7G7NfvUot2ysDWHhtQ",
    authDomain: "rater-56677.firebaseapp.com",
    databaseURL: "https://rater-56677.firebaseio.com",
    projectId: "rater-56677",
    storageBucket: "rater-56677.appspot.com",
    messagingSenderId: "257096710609",
    appId: "1:257096710609:web:94fefcf34fbab9267b88f0",
    measurementId: "G-VZL6T2RSJK"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebase