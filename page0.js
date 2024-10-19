// Import Firebase configuration and initialize
import { firebaseConfig } from "./config.js"; // Ensure this path is correct
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Select buttons
const signupBtn = document.querySelector('.signupbtn');
const loginBtn = document.querySelector('.loginbtn');
const resetBtn = document.querySelector('.resetbtn');
const errorMessageDiv = document.getElementById('error-message');

// Handle signup
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

// Handle login
loginBtn.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    errorMessageDiv.innerText = '';
    errorMessageDiv.style.display = 'none';

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = "https://tournamet-nine.xyz"; // Redirect to your tournament website
        })
        .catch((error) => {
            errorMessageDiv.innerText = error.message;
            errorMessageDiv.style.display = 'block';
        });
});

// Handle password reset
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
