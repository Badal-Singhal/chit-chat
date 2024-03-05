import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';


const config= {
    apiKey: "AIzaSyCzVA5bb7Iun64VAaezR-0emB0Sv1Ug3sQ",
    authDomain: "chit-chat-d0c24.firebaseapp.com",
    projectId: "chit-chat-d0c24",
    storageBucket: "chit-chat-d0c24.appspot.com",
    messagingSenderId: "945019788465",
    appId: "1:945019788465:web:2af9879b8587834d525690",
    databaseURL: "https://chit-chat-d0c24-default-rtdb.firebaseio.com/"
  }

  const app=firebase.initializeApp(config);

  export const auth=app.auth();
  export const database=app.database();
  