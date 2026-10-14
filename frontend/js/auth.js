
import { auth, db } from "../../cloud/firebase-config.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

console.log("CyberShield auth.js loaded");

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;
        const message = document.getElementById("loginMessage");
        const button = document.getElementById("loginBtn");

        button.disabled = true;
        message.textContent = "Logging in...";

        try {
            await signInWithEmailAndPassword(auth, email, password);
            message.textContent = "Login successful!";
            window.location.href = "home.html";
        } catch (error) {
            console.error("Login error:", error);
            message.textContent = error.code + ": " + error.message;
        } finally {
            button.disabled = false;
        }
    });
}

const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const message = document.getElementById("message");
        const button = document.getElementById("signupBtn");

        button.disabled = true;
        message.textContent = "Creating account...";

        try {
            const result = await createUserWithEmailAndPassword(
                auth, email, password
            );

            await setDoc(doc(db, "users", result.user.uid), {
                name: name,
                email: email,
                createdAt: serverTimestamp()
            });

            message.textContent = "Signup successful!";
            window.location.href = "home.html";
        } catch (error) {
            console.error("Signup error:", error);
            message.textContent = error.code + ": " + error.message;
        } finally {
            button.disabled = false;
        }
    });
}
