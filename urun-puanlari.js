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
const productCards = new Map();
const newProductIds = new Set(["tablo11", "tablo12", "tablo13", "tablo14"]);

function badgeArea(card) {
    let area = card.querySelector(":scope > .urun-rozetler");
    if (!area) {
        area = document.createElement("div");
        area.className = "urun-rozetler";
        area.setAttribute("aria-label", "Ürün özellikleri");
        card.insertBefore(area, card.firstChild);
    }
    return area;
}

function setBadge(card, type, label, visible) {
    const selector = ".urun-rozeti-" + type;
    let badge = card.querySelector(selector);

    if (!visible) {
        if (badge) badge.remove();
        const area = card.querySelector(":scope > .urun-rozetler");
        if (area && !area.children.length) area.remove();
        return;
    }

    if (!badge) {
        badge = document.createElement("span");
        badge.className = "urun-rozeti urun-rozeti-" + type;
        badge.textContent = label;
        badgeArea(card).appendChild(badge);
    }
}

document.querySelectorAll(".urun").forEach((card) => {
    const detailAction = card.getAttribute("onclick") || "";
    const match = detailAction.match(/urunDetay\('([^']+)'\)/);
    const rating = card.querySelector(".puan");
    if (!match || !rating) return;

    const productId = match[1];
    productCards.set(productId, card);
    ratingElements.set(productId, rating);
    rating.textContent = "☆ Henüz değerlendirme yok";
    setBadge(card, "yeni", "YENİ", newProductIds.has(productId));
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
        const card = productCards.get(productId);

        if (!result?.count) {
            element.textContent = "☆ Henüz değerlendirme yok";
            if (card) setBadge(card, "begenilen", "ÇOK BEĞENİLEN", false);
            return;
        }

        const score = result.total / result.count;
        element.textContent = `★ ${score.toFixed(1)} · ${result.count} yorum`;
        if (card) {
            setBadge(card, "begenilen", "ÇOK BEĞENİLEN", result.count >= 3 && score >= 4.5);
        }
    });
}, () => {
    ratingElements.forEach((element, productId) => {
        element.textContent = "Puan yüklenemedi";
        const card = productCards.get(productId);
        if (card) setBadge(card, "begenilen", "ÇOK BEĞENİLEN", false);
    });
});
