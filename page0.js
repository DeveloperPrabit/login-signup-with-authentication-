import { firebaseConfig } from './config.js';
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();
const signupForm = document.querySelector('.registration');
const loginForm = document.querySelector('.login');
const forgotForm = document.querySelector('.forgot');
const anchors = document.querySelectorAll('a');

// Function to toggle visibility of forms
const toggleFormVisibility = (formToShow) => {
  signupForm.classList.toggle('hidden', formToShow !== 'signup');
  loginForm.classList.toggle('hidden', formToShow !== 'login');
  forgotForm.classList.toggle('hidden', formToShow !== 'forgot');
};

// Event listeners for navigation between forms
anchors.forEach(anchor => {
  anchor.addEventListener('click', () => {
    const id = anchor.id;
    switch (id) {
      case 'loginLabel':
        toggleFormVisibility('login');
        break;
      case 'signupLabel':
        toggleFormVisibility('signup');
        break;
      case 'forgotLabel':
        toggleFormVisibility('forgot');
        break;
    }
  });
});

// Signup button logic
const signupBtn = document.querySelector('.signupbtn');
signupBtn.addEventListener('click', () => {
  const name = document.querySelector('#name').value.trim();
  const username = document.querySelector('#username').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value;

  if (!name || !username || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const uid = user.uid;

      return user.sendEmailVerification().then(() => {
        alert('Verification email sent. Please check your inbox and verify your email before signing in.');
      });
    })
    .then(() => {
      console.log('User data saved to Firestore');
      firestore.collection('users').doc(uid).set({
        name: name,
        username: username,
        email: email,
      });
      toggleFormVisibility('login'); // Redirect to login after signup
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        alert('Email is already in use. Please use a different email.');
      } else {
        alert('Error signing up: ' + error.message);
      }
    });
});

// Login button logic
const loginBtn = document.querySelector('.loginbtn');
loginBtn.addEventListener('click', () => {
  const email = document.querySelector('#inUsr').value.trim();
  const password = document.querySelector('#inPass').value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user.emailVerified) {
        console.log('User is signed in with a verified email.');
        location.href = "https://tournamet-nine.xyz"; // Redirect after successful login
      } else {
        alert('Please verify your email before signing in.');
      }
    })
    .catch((error) => {
      alert('Error signing in: ' + error.message);
    });
});

// Forgot password button logic
const forgotBtn = document.querySelector('.forgotbtn');
forgotBtn.addEventListener('click', () => {
  const emailForReset = document.querySelector('#forgotinp').value.trim();
  if (emailForReset.length > 0) {
    auth.sendPasswordResetEmail(emailForReset)
      .then(() => {
        alert('Password reset email sent. Please check your inbox to reset your password.');
        toggleFormVisibility('login'); // Show login after submission
      })
      .catch((error) => {
        alert('Error sending password reset email: ' + error.message);
      });
  }
});
