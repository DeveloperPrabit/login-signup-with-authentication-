import firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from "./config.js";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const signoutBtn = document.querySelector('#signoutbtn');

signoutBtn.addEventListener('click', () => {
  auth.signOut()
    .then(() => {
      console.log('User signed out successfully');
      location.href = "index.html";
    })
    .catch((error) => {
      alert('Error signing out: ' + error.message);
    });
});

// Check if user is signed in
auth.onAuthStateChanged(user => {
  if (!user) {
    // If no user is signed in, redirect to the login page
    location.href = "index.html";
  }
});
