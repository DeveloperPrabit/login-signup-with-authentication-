// Import Firebase configuration and initialize
import { firebaseConfig } from "./config.js"; // Ensure this path is correct
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Select the signup button, login button, reset button, and error message display
const signupBtn = document.querySelector('.signupbtn');
const loginBtn = document.querySelector('.loginbtn'); // Add this to your HTML
const resetBtn = document.querySelector('.resetbtn'); // Add this to your HTML
const errorMessageDiv = document.getElementById('error-message');

// Signup Functionality
signupBtn.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

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
            // Show success message and redirect to login
            alert("Signup successful! A verification email has been sent to your email address. Please verify your email.");
            window.location.href = "index.html"; // Redirect to login page
        })
        .catch((error) => {
            // Show error message
            errorMessageDiv.innerText = error.message;
            errorMessageDiv.style.display = 'block';
        });
});

// Login Functionality
loginBtn.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Clear previous error messages
    errorMessageDiv.innerText = '';
    errorMessageDiv.style.display = 'none';

    // Sign in with Firebase Authentication
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            // Successful login
            window.location.href = "https://tournamet-nine.xyz"; // Redirect to your tournament website
        })
        .catch((error) => {
            // Show error message
            errorMessageDiv.innerText = error.message;
            errorMessageDiv.style.display = 'block';
        });
});

// Password Reset Functionality
resetBtn.addEventListener('click', () => {
    const email = document.getElementById('email').value;

    // Clear previous error messages
    errorMessageDiv.innerText = '';
    errorMessageDiv.style.display = 'none';

    if (email) {
        // Send password reset email
        auth.sendPasswordResetEmail(email)
            .then(() => {
                alert("Password reset email sent! Please check your inbox.");
            })
            .catch((error) => {
                // Show error message
                errorMessageDiv.innerText = error.message;
                errorMessageDiv.style.display = 'block';
            });
    } else {
        errorMessageDiv.innerText = "Please enter your email address.";
        errorMessageDiv.style.display = 'block';
    }
});
