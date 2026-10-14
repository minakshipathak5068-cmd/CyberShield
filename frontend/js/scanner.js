import { auth, db } from "../../cloud/firebase-config.js";
import {
  addDoc,
  collection,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

function analyzeInput(input) {
  const text = input.trim();
  const lower = text.toLowerCase();

  const suspiciousPhrases = [
    "you win the lottery",
    "you have won",
    "you have win the prize",
    "claim your prize",
    "verify your account",
    "send your password",
    "urgent action required",
    "click here to claim",
    "home loan is aproved",
    "home loan is approved"
  ];

  if (suspiciousPhrases.some(phrase => lower.includes(phrase))) {
    return {
      result: "SUSPICIOUS MESSAGE",
      details: "This message contains a suspicious phrase. Verify it carefully."
    };
  }

  try {
    const url = new URL(text);
    if (url.protocol === "http:" || url.protocol === "https:") {
      return {
        result: "URL FORMAT VALID - SAFETY NOT VERIFIED",
        details: "The URL format is valid, but its safety has not been verified."
      };
    }
  } catch {}

  if (/https?:\/\//i.test(text)) {
    return {
      result: "INVALID URL FORMAT",
      details: "Please check the URL format."
    };
  }

  return {
    result: "REVIEW REQUIRED",
    details: "No listed suspicious phrase was detected. This does not prove the message is safe."
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const scanForm = document.getElementById("scanForm");
  const scanInput = document.getElementById("scanInput");
  const scanResult = document.getElementById("scanResult");
  const scanBtn = document.getElementById("scanBtn");

  if (!scanForm || !scanInput || !scanResult) {
    console.error("Scanner HTML elements not found.");
    return;
  }

  scanForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const input = scanInput.value.trim();

    if (!input) {
      scanResult.textContent = "Please enter a URL or message.";
      return;
    }

    if (scanBtn) {
      scanBtn.disabled = true;
      scanBtn.textContent = "Analyzing...";
    }

    try {
      const user = await new Promise((resolve) => {
        if (auth.currentUser) {
          resolve(auth.currentUser);
          return;
        }

        import("https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js")
          .then(({ onAuthStateChanged }) => {
            const unsubscribe = onAuthStateChanged(auth, currentUser => {
              unsubscribe();
              resolve(currentUser);
            });
          })
          .catch(() => resolve(null));
      });

      if (!user) {
        scanResult.textContent = "Please log in before scanning.";
        return;
      }

      const analysis = analyzeInput(input);

      await addDoc(collection(db, "scans"), {
        userId: user.uid,
        input,
        result: analysis.result,
        details: analysis.details,
        createdAt: serverTimestamp()
      });

      scanResult.textContent =
        `Result: ${analysis.result}. ${analysis.details}`;

      scanForm.reset();
    } catch (error) {
      console.error("Scan error:", error);
      scanResult.textContent = "Scan failed: " + error.message;
    } finally {
      if (scanBtn) {
        scanBtn.disabled = false;
        scanBtn.textContent = "Submit for Analysis";
      }
    }
  });
});