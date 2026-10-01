import { auth, db } from "../../cloud/firebase-config.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


let currentUser = null;


onAuthStateChanged(auth, (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    currentUser = user;
});


document.getElementById("scanBtn").addEventListener("click", async () => {

    const message =
        document.getElementById("messageInput").value.trim();

    const result =
        document.getElementById("scanResult");

    if (!message) {
        result.textContent = "Please enter a message.";
        return;
    }

    if (!currentUser) {
        result.textContent = "Please login first.";
        return;
    }

    try {

        // Temporary result for Firebase testing
        const scanResult = "Safe";

        await addDoc(collection(db, "scans"), {

            userId: currentUser.uid,

            input: message,

            result: scanResult,

            createdAt: serverTimestamp()
        });

        result.textContent =
            "Scan Result: " + scanResult;

    } catch (error) {

        console.error(error);

        result.textContent =
            "Error saving scan.";
    }
});