// Initialize Firebase
import { firebaseConfig } from "./config.js"; // Import your Firebase config
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// DOM Elements
const loginBtn = document.querySelector('.loginbtn');
const signupBtn = document.querySelector('.signupbtn');
const resetBtn = document.querySelector('.resetbtn');
const errorMessageDiv = document.getElementById('error-message');

// Login Functionality
loginBtn.addEventListener('click', () => {
    const email = document.getElementById('inUsr').value;
    const password = document.getElementById('inPass').value;

    // Clear previous error messages
    errorMessageDiv.innerText = '';
    errorMessageDiv.style.display = 'none';

    // Sign in with Firebase Authentication
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            // Redirect to your website on successful login
            window.location.href = "https://tournamet-nine.xyz"; // Redirect URL
        })
        .catch((error) => {
            // Show error message
            errorMessageDiv.innerText = error.message; // Get error message
            errorMessageDiv.style.display = 'block'; // Display error message
        });
});

// Signup Functionality
signupBtn.addEventListener('click', () => {
    const email = document.getElementById('signupEmail').value; // Ensure this ID matches your HTML
    const password = document.getElementById('signupPassword').value; // Ensure this ID matches your HTML

    // Clear previous error messages
    errorMessageDiv.innerText = '';
    errorMessageDiv.style.display = 'none';

    // Sign up with Firebase Authentication
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Send email verification
            const user = userCredential.user;
            return user.sendEmailVerification();
        })
        .then(() => {
            alert("Verification email sent! Please check your inbox.");
            window.location.href = "index.html"; // Redirect to login after signup
        })
        .catch((error) => {
            // Show error message
            errorMessageDiv.innerText = error.message; // Get error message
            errorMessageDiv.style.display = 'block'; // Display error message
        });
});

// Password Reset Functionality
resetBtn.addEventListener('click', () => {
    const email = document.getElementById('resetEmail').value; // Ensure this ID matches your HTML

    // Clear previous error messages
    errorMessageDiv.innerText = '';
    errorMessageDiv.style.display = 'none';

    // Send password reset email
    auth.sendPasswordResetEmail(email)
        .then(() => {
            alert("Password reset email sent! Please check your inbox.");
        })
        .catch((error) => {
            // Show error message
            errorMessageDiv.innerText = error.message; // Get error message
            errorMessageDiv.style.display = 'block'; // Display error message
        });
});
