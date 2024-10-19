// Import Firebase configuration and initialize
import { firebaseConfig } from "./config.js"; // Ensure this path is correct
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Select signup button and error message div
const signupBtn = document.querySelector('.signupbtn');
const errorMessageDiv = document.getElementById('error-message');

// Handle signup
if (signupBtn) {
    signupBtn.addEventListener('click', () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        errorMessageDiv.innerText = '';
        errorMessageDiv.style.display = 'none';

        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                return user.sendEmailVerification();
            })
            .then(() => {
                alert("Signup successful! A verification email has been sent to your email address.");
                window.location.href = "index.html"; // Redirect to login page
            })
            .catch((error) => {
                errorMessageDiv.innerText = error.message;
                errorMessageDiv.style.display = 'block';
            });
    });
}
