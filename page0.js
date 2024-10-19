// Firebase Config (you can move this to a separate config file if needed)
const firebaseConfig = {
  apiKey: "AIzaSyCG-fKixM5TvBFrB38d_cz2qq5EsKo8ZIE",
  authDomain: "login-and-signup-db287.firebaseapp.com",
  projectId: "login-and-signup-db287",
  storageBucket: "login-and-signup-db287.appspot.com",
  messagingSenderId: "601431236740",
  appId: "1:601431236740:web:0b3eef20599860ff9ba2d1",
  measurementId: "G-790KGDTKCW"
};
firebase.initializeApp(firebaseConfig);

// Firebase Auth Reference
const auth = firebase.auth();

// Handle Signup
const signupBtn = document.querySelector('.signupbtn');
const signupErrorMessage = document.getElementById('signup-error-message');
const signupSuccessMessage = document.getElementById('signup-success-message');

signupBtn.addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signupErrorMessage.style.display = 'none';
    signupSuccessMessage.style.display = 'none';

    // Firebase Signup
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            
            // Send email verification
            user.sendEmailVerification().then(() => {
                // Display success message
                signupSuccessMessage.innerText = "Signup successful! Please verify your email.";
                signupSuccessMessage.style.display = 'block';

                // Redirect to login after 3 seconds
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 3000);
            }).catch((error) => {
                signupErrorMessage.innerText = `Error: ${error.message}`;
                signupErrorMessage.style.display = 'block';
            });
        })
        .catch((error) => {
            const errorMessage = error.message;
            signupErrorMessage.innerText = `Error: ${errorMessage}`;
            signupErrorMessage.style.display = 'block';
        });
});

// Handle Login
const loginBtn = document.querySelector('.loginbtn');
const resetBtn = document.querySelector('.resetbtn');
const errorMessageDiv = document.getElementById('error-message');

loginBtn.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    errorMessageDiv.innerText = '';
    errorMessageDiv.style.display = 'none';

    // Firebase login process
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            if (user.emailVerified) {
                // If email is verified, redirect to the tournament page
                window.location.href = "https://tournamet-nine.xyz";
            } else {
                errorMessageDiv.innerText = "Please verify your email before logging in.";
                errorMessageDiv.style.display = 'block';
                auth.signOut();
            }
        })
        .catch((error) => {
            const errorMessage = error.message;
            errorMessageDiv.innerText = `Error: ${errorMessage}`;
            errorMessageDiv.style.display = 'block';
        });
});

// Handle Password Reset
resetBtn.addEventListener('click', () => {
    const email = document.getElementById('email').value;

    if (!email) {
        errorMessageDiv.innerText = "Please enter your email to reset your password.";
        errorMessageDiv.style.display = 'block';
        return;
    }

    // Firebase password reset process
    auth.sendPasswordResetEmail(email)
        .then(() => {
            alert('Password reset email sent! Please check your inbox.');
        })
        .catch((error) => {
            const errorMessage = error.message;
            errorMessageDiv.innerText = `Error: ${errorMessage}`;
            errorMessageDiv.style.display = 'block';
        });
});
            
