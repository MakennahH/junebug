import firebase from "firebase/app";
import "firebase/firestore";


// Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyD9utBzDbUKegR2OIMYGTQETUg3m5AQ-sk",
	authDomain: "junebug-754bc.firebaseapp.com",
	databaseURL: "https://junebug-754bc.firebaseio.com",
	projectId: "junebug-754bc",
	storageBucket: "junebug-754bc.appspot.com",
	messagingSenderId: "789403761474",
	appId: "1:789403761474:web:a198df78ecfcafe74b66db",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const auth = firebase.auth()

const notesCollection = db.collection('notes');

export {
	db,
	auth,
	notesCollection
}