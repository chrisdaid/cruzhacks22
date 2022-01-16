// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  update,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCb-m_BP1z-BI8CUy-uwotLThdlA9rQfsQ",
  authDomain: "cruzhacks22.firebaseapp.com",
  projectId: "cruzhacks22",
  storageBucket: "cruzhacks22.appspot.com",
  messagingSenderId: "56681085145",
  appId: "1:56681085145:web:b0b29324cb81924e8466c8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

const signUpBtn = document.querySelector("#signup-btn");
const loginBtn = document.querySelector("#login-btn");
const usernameText = document.querySelector("#username-db");

const errorMessageText = document.querySelector(".error-text");

if (signUpBtn) {
  signUpBtn.addEventListener("click", (e) => {
    var email = document.getElementById("email").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log("AUTO SIGNED IN");
        const user = userCredential.user;
        const dt = new Date();
        set(ref(database, "users/" + user.uid), {
          username: username,
          email: email,
          highscore: 0,
        });

        // set error message to account created and change red to black
        errorMessageText.style.color = "#000";
        errorMessageText.innerText = "account created, please login";
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        // set error message
        errorMessageText.innerText = error.code;
        // ..
      });
  });
}

let userId;

if (loginBtn) {
  loginBtn.addEventListener("click", (e) => {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const dt = new Date();
        userId = user.uid;
        update(ref(database, "users/" + user.uid), {
          last_login: dt,
        });
        // clear error message
        errorMessageText.innerText = "";
        window.location.href = "/game.html";
        console.log(user.displayName);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        errorMessageText.innerText = error.code;
      });
  });
}

const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    let currentURL = window.location.href;
    let currentFile = currentURL.split("/");
    currentFile = currentFile[currentFile.length - 1];
    console.log(`${user.email} SIGNED IN`);
    if (currentFile == "index.html") {
      // now redirect to login page because account created
      // window.location.href = "/login.html";
    }
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});
const signoutBtn = document.querySelector("#sign-out-btn");
if (signoutBtn) {
  signoutBtn.addEventListener("click", (e) => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        window.location.href = "/login.html";
      })
      .catch((error) => {
        // An error happened.
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  });
}

// if (usernameText) {
const dbRef = ref(getDatabase());
get(child(dbRef, `users/${userId}`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
});
console.log(userId);
// }
