import { auth, db } from "../../cloud/firebase-config.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    collection,
    query,
    where,
    orderBy,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    const historyList =
        document.getElementById("historyList");

    try {

        const q = query(
            collection(db, "scans"),
            where("userId", "==", user.uid),
            orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) {

            historyList.textContent =
                "No scan history found.";

            return;
        }

        snapshot.forEach((doc) => {

            const data = doc.data();

            const item = document.createElement("div");

            item.className = "history-item";

            item.textContent =
                `Message: ${data.input} | Result: ${data.result}`;

            historyList.appendChild(item);
        });

    } catch (error) {

    console.error("HISTORY ERROR:", error);

    historyList.textContent =
        "Error: " + error.message;
}
});