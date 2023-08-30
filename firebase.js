

  

// Import the Firebase SDK modules
import firebase from "firebase/app";
import "firebase/database";

// Configure your Firebase app (replace with your own config)
const firebaseConfig = {
    apiKey: "AIzaSyCECf5fhF6dApwBwYLfTWPIOSnMe6d73WY",
    authDomain: "my-blog-6ec0b.firebaseapp.com",
    databaseURL: "https://my-blog-6ec0b-default-rtdb.firebaseio.com",
    projectId: "my-blog-6ec0b",
    storageBucket: "my-blog-6ec0b.appspot.com",
    messagingSenderId: "300686655718",
    appId: "1:300686655718:web:8b1e36435f97ab684e3b27",
    measurementId: "G-5ZRPJRNP6G"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Define your functions or logic
function getReference() {
  // [START rtdb_get_reference]
  var database = firebase.database();
  // [END rtdb_get_reference]
}

// Export any functions or objects you want to use in other modules
export { getReference };


 