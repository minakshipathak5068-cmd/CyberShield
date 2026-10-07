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


// SIGNUP
const signupBtn = document.getElementById("signupBtn");

if (signupBtn) {

    signupBtn.addEventListener("click", async () => {

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const message = document.getElementById("message");

        if (!name || !email || !password) {
            message.textContent = "Please fill all fields.";
            return;
        }

        try {

            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: email,
                createdAt: serverTimestamp()
            });

            message.textContent = "Account created successfully.";

            setTimeout(() => {
                window.location.href = "home.html";
            }, 1000);

        } catch (error) {

            console.error(error);
            message.textContent = error.message;
        }
    });
}


// LOGIN
const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {

    loginBtn.addEventListener("click", async () => {

        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        const message =
            document.getElementById("loginMessage");

        if (!email || !password) {
            message.textContent = "Please enter email and password.";
            return;
        }

        try {

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            window.location.href = "home.html";

        } catch (error) {

            console.error(error);
            message.textContent = error.message;
        }
    });
}