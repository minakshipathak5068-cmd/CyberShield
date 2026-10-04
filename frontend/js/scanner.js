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

    result.textContent = "Scanning...";

    // Send message to Python AI
    const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: message
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "AI prediction failed");
    }

    const scanResult = data.prediction;

    // Save AI result to Firebase
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
        "Error: " + error.message;
}
});