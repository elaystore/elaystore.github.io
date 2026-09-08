import { getApp, getApps, initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";
import {
    collection,
    deleteDoc,
    doc,
    getFirestore,
    onSnapshot,
    query,
    serverTimestamp,
    setDoc,
    where
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
const auth = getAuth(app);
const db = getFirestore(app);
const productId = new URLSearchParams(location.search).get("urun") || "mouse";
const productName = document.getElementById("ad")?.textContent || "Ürün";
const form = document.getElementById("yorumFormu");
const loginNotice = document.getElementById("yorumGirisUyari");
const loginLink = document.getElementById("yorumGirisLinki");
const commentText = document.getElementById("yorumMetni");
const message = document.getElementById("yorumMesaj");
const submitButton = document.getElementById("yorumGonder");
const list = document.getElementById("yorumListesi");
const summary = document.getElementById("yorumOzet");
const average = document.getElementById("yorumOrtalama");
let currentUser = null;
let latestReviews = [];
const adminEmails = new Set([
    "sevdatyby@gmail.com",
    "erdoganbyagiz@gmail.com"
]);

loginLink.href = `uye.html?donus=${encodeURIComponent(location.pathname.split("/").pop() + location.search)}`;

onAuthStateChanged(auth, (user) => {
    currentUser = user;
    form.hidden = !user;
    loginNotice.hidden = Boolean(user);
    renderReviews(latestReviews);
});

function formatDate(value) {
    if (!value || typeof value.toDate !== "function") return "Az önce";
    return value.toDate().toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

function renderReviews(reviews) {
    list.replaceChildren();
    if (!reviews.length) {
        const empty = document.createElement("p");
        empty.className = "yorum-yok";
        empty.textContent = "Bu ürün için henüz yorum yapılmamış. İlk yorumu siz yazabilirsiniz.";
        list.appendChild(empty);
        summary.textContent = "Henüz yorum yapılmamış.";
        average.textContent = "—";
        average.setAttribute("aria-label", "Henüz puan verilmemiş");
        const productRating = document.getElementById("puan");
        if (productRating) productRating.textContent = "☆ Henüz değerlendirme yok";
        return;
    }

    const score = reviews.reduce((total, review) => total + Number(review.rating || 0), 0) / reviews.length;
    summary.textContent = `${reviews.length} müşteri yorumu`;
    average.textContent = `★ ${score.toFixed(1)}`;
    average.setAttribute("aria-label", `Ortalama ${score.toFixed(1)} puan`);
    const productRating = document.getElementById("puan");
    if (productRating) productRating.textContent = `★ ${score.toFixed(1)} · ${reviews.length} yorum`;

    reviews.forEach((review) => {
        const card = document.createElement("article");
        card.className = "yorum-karti";

        const top = document.createElement("div");
        top.className = "yorum-karti-ust";
        const userBlock = document.createElement("div");
        const name = document.createElement("h3");
        name.textContent = review.userName || "Elay Store üyesi";
        const stars = document.createElement("div");
        stars.className = "yorum-yildizlari";
        stars.textContent = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);
        stars.setAttribute("aria-label", `${review.rating} yıldız`);
        const date = document.createElement("time");
        date.className = "yorum-tarih";
        date.textContent = formatDate(review.createdAt);
        const body = document.createElement("p");
        body.textContent = review.text;

        userBlock.append(name, stars);
        top.append(userBlock, date);
        card.append(top, body);

        const currentEmail = currentUser?.email?.toLowerCase() || "";
        const canDelete = currentUser && (
            currentUser.uid === review.userId || adminEmails.has(currentEmail)
        );
        if (canDelete) {
            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.className = "yorum-sil-btn";
            deleteButton.textContent = "Yorumu Sil";
            deleteButton.addEventListener("click", async () => {
                if (!window.confirm("Bu yorumu silmek istediğinizden emin misiniz?")) return;
                deleteButton.disabled = true;
                deleteButton.textContent = "Siliniyor…";
                try {
                    await deleteDoc(doc(db, "reviews", review.id));
                } catch (error) {
                    deleteButton.disabled = false;
                    deleteButton.textContent = "Yorumu Sil";
                    window.alert("Yorum silinemedi. Lütfen tekrar deneyin.");
                }
            });
            card.appendChild(deleteButton);
        }
        list.appendChild(card);
    });
}

const reviewsQuery = query(collection(db, "reviews"), where("productId", "==", productId));
onSnapshot(reviewsQuery, (snapshot) => {
    latestReviews = snapshot.docs
        .map((item) => ({ id: item.id, ...item.data() }))
        .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
    renderReviews(latestReviews);
}, () => {
    list.innerHTML = '<p class="yorum-hata">Yorumlar şu anda yüklenemedi. Lütfen daha sonra tekrar deneyin.</p>';
});

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    message.textContent = "";
    if (!currentUser) {
        message.textContent = "Yorum yazmak için giriş yapmanız gerekiyor.";
        return;
    }

    const rating = Number(new FormData(form).get("puan"));
    const text = commentText.value.trim();
    if (!Number.isInteger(rating) || rating < 1 || rating > 5 || text.length < 3 || text.length > 500) {
        message.textContent = "Lütfen yıldız seçin ve 3–500 karakter arasında yorum yazın.";
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Gönderiliyor…";
    try {
        await setDoc(doc(db, "reviews", `${productId}_${currentUser.uid}`), {
            productId,
            productName,
            userId: currentUser.uid,
            userName: currentUser.displayName || currentUser.email?.split("@")[0] || "Elay Store üyesi",
            rating,
            text,
            createdAt: serverTimestamp()
        });
        form.reset();
        message.textContent = "Yorumunuz yayınlandı. Teşekkür ederiz.";
    } catch (error) {
        message.textContent = "Yorum gönderilemedi. Lütfen tekrar deneyin.";
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Yorumu Gönder";
    }
});
