import { signInWithPopup, onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { auth, provider } from "./firebase.js";

/* 🔑 SIGN IN */
function googleSignIn() {
  signInWithPopup(auth, provider).catch(err => {
    console.error(err);
    alert(err.message);
  });
}

/* 🔁 REDIRECT AFTER LOGIN (THIS IS THE KEY FIX) */
onAuthStateChanged(auth, user => {
  if (user) {
    window.location.href =
      window.location.origin + "/Medical-DigiLocker/dashboard.html";
  }
});

/* EXPOSE BUTTON FUNCTION */
window.googleSignIn = googleSignIn;
