// Import Firebase configuration and initialize
import { firebaseConfig } from "./config.js"; // Ensure this path is correct
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Select login button and error message div
const loginBtn = document.querySelector('.loginbtn');
const errorMessageDiv = document.getElementById('error-message');

// Handle login
if (loginBtn) {
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
}
