// Import Firebase configuration and initialize
import { firebaseConfig } from "./config.js"; // Ensure this path is correct
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Select reset button and error message div
const resetBtn = document.querySelector('.resetbtn');
const errorMessageDiv = document.getElementById('error-message');

// Handle password reset
if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        const email = document.getElementById('email').value;

        errorMessageDiv.innerText = '';
        errorMessageDiv.style.display = 'none';

        if (email) {
            auth.sendPasswordResetEmail(email)
                .then(() => {
                    alert("Password reset email sent! Please check your inbox.");
                })
                .catch((error) => {
                    errorMessageDiv.innerText = error.message;
                    errorMessageDiv.style.display = 'block';
                });
        } else {
            errorMessageDiv.innerText = "Please enter your email address.";
            errorMessageDiv.style.display = 'block';
        }
    });
}

