import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-storage.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

/* 🔐 AUTH PROTECTION */
onAuthStateChanged(auth, user => {
  if (!user) {
    window.location.href = "./index.html";
  } else {
    loadFiles(user.uid);
  }
});

/* 📤 UPLOAD FILE */
function uploadFile() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];
  const user = auth.currentUser;

  if (!file) {
    alert("Please select a file");
    return;
  }

  const fileRef = ref(storage, `records/${user.uid}/${file.name}`);

  uploadBytes(fileRef, file)
    .then(() => getDownloadURL(fileRef))
    .then(url => {
      return addDoc(collection(db, "records"), {
        uid: user.uid,
        fileName: file.name,
        fileURL: url,
        uploadedAt: serverTimestamp()
      });
    })
    .then(() => {
      fileInput.value = "";
    })
    .catch(err => alert(err.message));
}

/* 📂 LOAD FILES */
function loadFiles(uid) {
  const q = query(
    collection(db, "records"),
    where("uid", "==", uid)
  );

  onSnapshot(q, snapshot => {
    const div = document.getElementById("records");
    div.innerHTML = "";

    if (snapshot.empty) {
      div.innerHTML = "<p>No medical records uploaded yet.</p>";
      return;
    }

    snapshot.forEach(doc => {
      const data = doc.data();
      div.innerHTML += `
        <p>
          📄 <a href="${data.fileURL}" target="_blank">${data.fileName}</a>
        </p>
      `;
    });
  });
}

/* 🚪 LOGOUT */
function logout() {
  signOut(auth).then(() => {
window.location.href =
      window.location.origin + "/medical-digilocker/index.html";  });
}

/* 🔗 Make functions accessible to HTML */
window.uploadFile = uploadFile;
window.logout = logout;