import { db } from "./firebase-config.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


/**
 * Save a scan result to Firestore
 */
export async function saveScan(userId, input, result) {

    if (!userId) {
        throw new Error("User is not logged in.");
    }

    if (!input || !input.trim()) {
        throw new Error("Scan input cannot be empty.");
    }

    const scanData = {
        userId: userId,
        input: input.trim(),
        result: result,
        createdAt: serverTimestamp()
    };

    const docRef = await addDoc(
        collection(db, "scans"),
        scanData
    );

    return docRef.id;
}