import { signInWithPopup } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { auth, provider } from "./firebase.js";

function googleSignIn() {
  signInWithPopup(auth, provider).catch(err => {
    console.error(err);
    alert(err.message);
  });
}

window.googleSignIn = googleSignIn;
