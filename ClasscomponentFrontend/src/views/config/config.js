import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
const config = {
  apiKey: "AIzaSyALljw5HuWPu_CQygFmt81Mslr2PnlgPmg",
    authDomain: "chatting-f8264.firebaseapp.com",
    databaseURL: "https://chatting-f8264.firebaseio.com",
    projectId: "chatting-f8264",
    storageBucket: "chatting-f8264.appspot.com",
    messagingSenderId: "747950572234",
    appId: "1:747950572234:web:72dcf1bc7dd23049e96a33",
    measurementId: "G-E0RJYJRXQP"
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();