// js/auth.js
import { signInWithPopup } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
import { auth, provider, db } from "./firebase.js";

function googleSignIn() {
  signInWithPopup(auth, provider)
    .then(result => {
      const user = result.user;

      return setDoc(
        doc(db, "patients", user.uid),
        {
          name: user.displayName,
          email: user.email,
          lastLogin: serverTimestamp()
        },
        { merge: true }
      );
    })
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch(error => alert(error.message));
}

window.googleSignIn = googleSignIn;
