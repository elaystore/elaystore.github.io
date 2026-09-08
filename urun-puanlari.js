import { getApp, getApps, initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
import {
    collection,
    getFirestore,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDKpEI_TzDxA38N30BEjMScnl0GnYabl3c",
    authDomain: "elaystore-c4d53.firebaseapp.com",
    projectId: "elaystore-c4d53",
    storageBucket: "elaystore-c4d53.firebasestorage.app",
    messagingSenderId: "585341292448",
    appId: "1:585341292448:web:51ace255ab2fcf89b21ec5",
    measurementId: "G-YMS32EVTTH"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const ratingElements = new Map();

document.querySelectorAll(".urun").forEach((card) => {
    const detailAction = card.getAttribute("onclick") || "";
    const match = detailAction.match(/urunDetay\('([^']+)'\)/);
    const rating = card.querySelector(".puan");
    if (!match || !rating) return;
    ratingElements.set(match[1], rating);
    rating.textContent = "☆ Henüz değerlendirme yok";
});

onSnapshot(collection(db, "reviews"), (snapshot) => {
    const totals = new Map();
    snapshot.forEach((item) => {
        const review = item.data();
        if (!ratingElements.has(review.productId)) return;
        const current = totals.get(review.productId) || { total: 0, count: 0 };
        current.total += Number(review.rating || 0);
        current.count += 1;
        totals.set(review.productId, current);
    });

    ratingElements.forEach((element, productId) => {
        const result = totals.get(productId);
        if (!result?.count) {
            element.textContent = "☆ Henüz değerlendirme yok";
            return;
        }
        const score = result.total / result.count;
        element.textContent = `★ ${score.toFixed(1)} · ${result.count} yorum`;
    });
}, () => {
    ratingElements.forEach((element) => {
        element.textContent = "Puan yüklenemedi";
    });
});
