import firebase from "firebase";


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

const usersCollection = db.collection('users');
// const notesCollection = db.collection('notes');
// const alarmsCollection = db.collection('alarms');
// const eventsCollection = db.collection('events');
// const tasksCollection = db.collection('tasks');
// const timelimitsCollection = db.collection('timelimits');

export {
	db,
	auth,
    usersCollection
	// notesCollection,
    // alarmsCollection,
    // eventsCollection,
    // tasksCollection,
    // timelimitsCollection
}