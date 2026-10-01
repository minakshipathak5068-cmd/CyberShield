import { auth, db } from "../../cloud/firebase-config.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    try {

        const userDoc =
            await getDoc(doc(db, "users", user.uid));

        if (userDoc.exists()) {

            const data = userDoc.data();

            document.getElementById("userName").textContent =
                data.name;
        }

    } catch (error) {

        console.error(error);
    }
});


document.getElementById("logoutBtn").addEventListener("click", async () => {

    try {

        await signOut(auth);

        window.location.href = "login.html";

    } catch (error) {

        console.error(error);
    }
});