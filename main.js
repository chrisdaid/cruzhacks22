// import { initializeApp } from "firebase/app";

// TODO: Replace the following with your app's//// Firebase project configuration in right place??
// const firebaseConfig = {
//   apiKey: "AIzaSyCBpfNw-e5uE2-KfSGhvugZYa4vydZ0OIo",
//   authDomain: "cruzhacks2022.firebaseapp.com",
//   projectId: "cruzhacks2022",
//   storageBucket: "cruzhacks2022.appspot.com",
//   messagingSenderId: "496643463087",
//   appId: "1:496643463087:web:f4abeaec7b0c5d732c415a",
//   measurementId: "G-4ZSY6B91FG", //...
// };

// const app = initializeApp(firebaseConfig);

// js for the application

const password = document.getElementById("password");
const showPassword = document.getElementById("show-password");
const hidePassword = document.getElementById("hide-password");
//click eye to reveal password
showPassword.addEventListener("click", () => {
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
});
// click eye with slash to hide password
hidePassword.addEventListener("click", () => {
  const type = password.getAttribute("type") === "text" ? "password" : "text";
  password.setAttribute("type", type);
});

const showPass = document.querySelector(".fa-eye");
const hidePass = document.querySelector(".fa-eye-slash");
// once eye is clicked, hide the eye and reveal the eye w slash
showPass.addEventListener("click", () => {
  showPass.classList.toggle("hidden");
  hidePass.classList.toggle("hidden");
});
// once eye w slash is clicked, hide the eye w slash and reveal the eye
hidePass.addEventListener("click", () => {
  hidePass.classList.toggle("hidden");
  showPass.classList.toggle("hidden");
});

// prevent form from submitting
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});
