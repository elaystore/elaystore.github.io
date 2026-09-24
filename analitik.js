(function () {
    const olcumKimligi = "G-YMS32EVTTH";
    const izinAnahtari = "elay_analitik_izni";

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
        window.dataLayer.push(arguments);
    };

    window.gtag("consent", "default", {
        ad_storage: "denied",
        analytics_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied"
    });

    function analitigiBaslat() {
        window.gtag("consent", "update", {
            analytics_storage: "granted",
            ad_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied"
        });

        const etiket = document.createElement("script");
        etiket.async = true;
        etiket.src = "https://www.googletagmanager.com/gtag/js?id=" + olcumKimligi;
        etiket.onload = function () {
            window.gtag("js", new Date());
            window.gtag("config", olcumKimligi, {
                allow_google_signals: false,
                allow_ad_personalization_signals: false
            });
        };
        document.head.appendChild(etiket);
    }

    function bildirimiGoster() {
        const bildirim = document.createElement("aside");
        bildirim.className = "cerez-bildirimi";
        bildirim.setAttribute("role", "dialog");
        bildirim.setAttribute("aria-label", "Analitik çerez tercihi");
        bildirim.innerHTML =
            '<div><strong>Ziyaretçi istatistikleri</strong>' +
            '<p>Siteyi geliştirmek için anonim ziyaret ve sayfa görüntüleme bilgilerini ölçmek istiyoruz.</p></div>' +
            '<div class="cerez-butonlari">' +
            '<button type="button" class="cerez-reddet">Reddet</button>' +
            '<button type="button" class="cerez-kabul">Kabul Et</button>' +
            '</div>';

        bildirim.querySelector(".cerez-kabul").addEventListener("click", function () {
            localStorage.setItem(izinAnahtari, "kabul");
            bildirim.remove();
            analitigiBaslat();
        });

        bildirim.querySelector(".cerez-reddet").addEventListener("click", function () {
            localStorage.setItem(izinAnahtari, "reddet");
            window.gtag("consent", "update", {
                analytics_storage: "denied",
                ad_storage: "denied",
                ad_user_data: "denied",
                ad_personalization: "denied"
            });
            bildirim.remove();
        });

        document.body.appendChild(bildirim);
    }

    const izin = localStorage.getItem(izinAnahtari);
    if (izin === "kabul") {
        analitigiBaslat();
    } else if (izin !== "reddet") {
        bildirimiGoster();
    }
})();


(function () {
    function baslat() {
        const header = document.querySelector("body > header");
        if (!header || document.querySelector(".mobil-menu-panel")) return;

        const style = document.createElement("style");
        style.textContent = `
          .mobil-ust,.mobil-menu-perde,.mobil-menu-panel{display:none}
          @media(max-width:760px){
            body.mobil-menu-acik{overflow:hidden}
            body>header{position:relative!important;z-index:30000!important;display:flex!important;flex-wrap:nowrap!important;align-items:center!important;justify-content:space-between!important;min-height:72px!important;padding:8px 14px!important;text-align:left!important}
            body>header>.marka{min-width:0!important}
            body>header .site-logo{width:min(145px,42vw)!important;height:52px!important;object-fit:contain!important;object-position:left center!important}
            body>header>nav{display:none!important}
            .mobil-ust{display:flex;align-items:center;gap:6px;margin-left:auto}
            .mobil-sepet,.mobil-menu-ac{display:inline-flex!important;align-items:center;justify-content:center;min-height:44px;margin:0!important;border:0;border-radius:9px;color:#fff!important;background:transparent!important;font:inherit;font-size:14px;font-weight:700;text-decoration:none;cursor:pointer}
            .mobil-sepet{gap:4px;padding:7px 8px!important}
            .mobil-menu-ac{position:relative;width:46px;padding:0!important;font-size:0}
            .mobil-menu-ac span,.mobil-menu-ac:before,.mobil-menu-ac:after{position:absolute;display:block;width:25px;height:2px;border-radius:2px;background:#fff;content:""}
            .mobil-menu-ac:before{transform:translateY(-8px)}
            .mobil-menu-ac:after{transform:translateY(8px)}
            .mobil-menu-perde{position:fixed;inset:72px 0 0;z-index:29980;border:0;background:rgba(20,17,16,.10);opacity:0;transition:opacity .2s}
            .mobil-menu-panel{position:fixed;top:72px;right:0;bottom:0;z-index:29990;display:flex;width:min(390px,90vw);padding:12px 22px 26px;flex-direction:column;overflow-y:auto;border-left:1px solid #eadfd8;color:#242120;background:#fff;box-shadow:-18px 18px 42px rgba(31,24,21,.18);transform:translateX(105%);transition:transform .24s ease}
            body.mobil-menu-acik .mobil-menu-perde{display:block;opacity:1}
            body.mobil-menu-acik .mobil-menu-panel{transform:translateX(0)}
            .mobil-menu-kapat{align-self:flex-end;width:44px;height:44px;margin:0 0 4px;padding:0;border:0;color:#4b4643;background:transparent;font-size:34px;font-weight:300;line-height:1;cursor:pointer}
            .mobil-menu-liste{display:grid}
            .mobil-menu-liste a,.mobil-menu-liste button{display:grid;grid-template-columns:34px 1fr auto;align-items:center;gap:12px;width:100%;min-height:64px;margin:0!important;padding:10px 4px!important;border:0;border-bottom:1px solid #eee5df;border-radius:0;color:#242120!important;background:transparent!important;font:inherit;font-size:17px;font-weight:650;text-align:left;text-decoration:none;cursor:pointer}
            .mobil-menu-liste a:hover,.mobil-menu-liste button:hover{color:#a80f22!important;background:#fff8f6!important}
            .mobil-menu-liste .mobil-aktif{color:#a80f22!important}
            .mobil-ikon{font-size:22px;text-align:center}
            .mobil-ok{color:#877e79;font-size:24px;font-weight:400}
            .mobil-menu-liste [hidden]{display:none!important}
          }
          @media(max-width:390px){.mobil-sepet-yazi{display:none}.mobil-menu-panel{width:92vw;padding-inline:17px}}
        `;
        document.head.appendChild(style);

        const ust = document.createElement("div");
        ust.className = "mobil-ust";
        ust.innerHTML = '<a class="mobil-sepet" href="sepet.html" aria-label="Sepeti aç">🛒 <span class="mobil-sepet-yazi">Sepet</span> (<span class="mobil-sepet-sayi">0</span>)</a><button class="mobil-menu-ac" type="button" aria-label="Menüyü aç" aria-expanded="false"><span></span></button>';
        header.appendChild(ust);

        const perde = document.createElement("button");
        perde.type = "button";
        perde.className = "mobil-menu-perde";
        perde.setAttribute("aria-label","Menüyü kapat");

        const panel = document.createElement("aside");
        panel.className = "mobil-menu-panel";
        panel.setAttribute("aria-label","Mobil menü");
        panel.setAttribute("aria-hidden","true");
        panel.innerHTML =
          '<button class="mobil-menu-kapat" type="button" aria-label="Menüyü kapat">×</button>' +
          '<nav class="mobil-menu-liste">' +
          '<a class="mobil-aktif" href="index.html#urunler"><span class="mobil-ikon">▦</span><span>Ürünler</span><span class="mobil-ok">›</span></a>' +
          '<a href="kisiye-ozel.html"><span class="mobil-ikon">✎</span><span>Kişiye Özel Sipariş</span><span class="mobil-ok">›</span></a>' +
          '<a href="profil.html" data-giris="uye"><span class="mobil-ikon">♙</span><span>Profilim</span><span class="mobil-ok">›</span></a>' +
          '<a href="profil.html#favorilerPaneli" data-giris="uye"><span class="mobil-ikon">♡</span><span>Favorilerim</span><span class="mobil-ok">›</span></a>' +
           '<a href="sss.html"><span class="mobil-ikon">?</span><span>Sık Sorulan Sorular</span><span class="mobil-ok">›</span></a>' +
          '<a href="hakkimizda.html"><span class="mobil-ikon">ⓘ</span><span>Hakkımızda</span><span class="mobil-ok">›</span></a>' +
          '<a href="iletisim.html"><span class="mobil-ikon">✉</span><span>İletişim</span><span class="mobil-ok">›</span></a>' +
          '<a href="uye.html" data-giris="misafir"><span class="mobil-ikon">♙</span><span>Üye Ol / Giriş Yap</span><span class="mobil-ok">›</span></a>' +
          '<button class="mobil-cikis" type="button" data-giris="uye"><span class="mobil-ikon">↪</span><span>Çıkış Yap</span><span class="mobil-ok">›</span></button>' +
          '</nav>';
        document.body.append(perde,panel);

        const ac = ust.querySelector(".mobil-menu-ac");
        const kapat = panel.querySelector(".mobil-menu-kapat");
        function menuAc(){document.body.classList.add("mobil-menu-acik");ac.setAttribute("aria-expanded","true");panel.setAttribute("aria-hidden","false");kapat.focus()}
        function menuKapat(){document.body.classList.remove("mobil-menu-acik");ac.setAttribute("aria-expanded","false");panel.setAttribute("aria-hidden","true")}
        function sepetiEsitle(){
          const asil=document.getElementById("sepetSayi");
          let sayi=asil?asil.textContent:"0";
          if(!asil){try{const sepet=JSON.parse(localStorage.getItem("sepet")||"[]");sayi=Array.isArray(sepet)?String(sepet.length):"0"}catch(e){}}
          ust.querySelector(".mobil-sepet-sayi").textContent=sayi;
        }
        function girisiEsitle(){
          const profil=document.getElementById("profilMenu");
          const giris=document.body.classList.contains("profil-sayfasi")||Boolean(profil&&!profil.hidden);
          panel.querySelectorAll('[data-giris="uye"]').forEach(function(x){x.hidden=!giris});
          panel.querySelectorAll('[data-giris="misafir"]').forEach(function(x){x.hidden=giris});
        }

        ac.addEventListener("click",menuAc);
        kapat.addEventListener("click",menuKapat);
        perde.addEventListener("click",menuKapat);
        panel.querySelectorAll("a").forEach(function(x){x.addEventListener("click",menuKapat)});
        panel.querySelector(".mobil-cikis").addEventListener("click",function(){
          const cikis=document.getElementById("cikisBtn")||document.getElementById("profilCikis");
          if(cikis)cikis.click();
          menuKapat();
        });
        document.addEventListener("keydown",function(e){if(e.key==="Escape")menuKapat()});
        window.addEventListener("resize",function(){if(innerWidth>760)menuKapat()});
        const asil=document.getElementById("sepetSayi");
        if(asil)new MutationObserver(sepetiEsitle).observe(asil,{childList:true,subtree:true,characterData:true});
        const profil=document.getElementById("profilMenu");
        if(profil)new MutationObserver(girisiEsitle).observe(profil,{attributes:true,attributeFilter:["hidden"]});
        sepetiEsitle();
        girisiEsitle();
    }
    if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",baslat);else baslat();
})();

(function () {
    function elayTicaretTakibiniBaslat() {
        const izinAnahtari = "elay_analitik_izni";

        function izinVarMi() {
            try {
                return localStorage.getItem(izinAnahtari) === "kabul";
            } catch (hata) {
                return false;
            }
        }

        function olayGonder(olayAdi, bilgiler) {
            if (!izinVarMi() || typeof window.gtag !== "function") return;
            window.gtag("event", olayAdi, Object.assign({
                transport_type: "beacon"
            }, bilgiler || {}));
        }

        window.elayAnalitikOlay = olayGonder;

        function fiyatSayiya(metin) {
            const rakamlar = String(metin || "").replace(/[^0-9]/g, "");
            return rakamlar ? Number(rakamlar) : 0;
        }

        function guvenliKimlik(deger) {
            return String(deger || "urun")
                .toLocaleLowerCase("tr-TR")
                .replace(/[^a-z0-9çğıöşü]+/g, "-")
                .replace(/^-+|-+$/g, "");
        }

        function karttanUrun(kart) {
            if (!kart) return null;
            const tiklama = kart.getAttribute("onclick") || "";
            const eslesme = tiklama.match(/urunDetay\(['"]([^'"]+)['"]\)/);
            const ad = kart.querySelector("h2")?.textContent?.trim() || "Elay Filografi Ürünü";
            const fiyat = fiyatSayiya(kart.querySelector(".fiyat")?.textContent);
            return {
                id: eslesme?.[1] || guvenliKimlik(ad),
                ad: ad,
                fiyat: fiyat
            };
        }

        function detaydanUrun() {
            const ad = document.getElementById("ad")?.textContent?.trim();
            if (!ad) return null;
            return {
                id: new URLSearchParams(location.search).get("urun") || guvenliKimlik(ad),
                ad: ad,
                fiyat: fiyatSayiya(document.getElementById("fiyat")?.textContent)
            };
        }

        function urunParametreleri(urun) {
            if (!urun) return {};
            return {
                currency: "TRY",
                value: urun.fiyat || 0,
                items: [{
                    item_id: urun.id,
                    item_name: urun.ad,
                    price: urun.fiyat || 0,
                    quantity: 1
                }]
            };
        }

        function sepetUrunleri() {
            try {
                const sepet = JSON.parse(localStorage.getItem("sepet") || "[]");
                if (!Array.isArray(sepet)) return [];
                return sepet.map(function (urun, sira) {
                    const fiyat = Number(urun.fiyat) || 0;
                    return {
                        item_id: urun.id || urun.resim || guvenliKimlik(urun.ad) || ("urun-" + (sira + 1)),
                        item_name: urun.ad || "Elay Filografi Ürünü",
                        price: fiyat,
                        quantity: 1
                    };
                });
            } catch (hata) {
                return [];
            }
        }

        function sepetParametreleri() {
            const items = sepetUrunleri();
            return {
                currency: "TRY",
                value: items.reduce(function (toplam, urun) {
                    return toplam + (Number(urun.price) || 0) * (Number(urun.quantity) || 1);
                }, 0),
                items: items
            };
        }

        const sayfa = location.pathname.split("/").pop() || "index.html";

        if (sayfa === "urun.html") {
            const urun = detaydanUrun();
            if (urun) olayGonder("view_item", urunParametreleri(urun));
        }

        if (sayfa === "sepet.html") {
            const sepetBilgisi = sepetParametreleri();
            if (sepetBilgisi.items.length) olayGonder("view_cart", sepetBilgisi);
        }

        document.addEventListener("click", function (event) {
            const hedef = event.target.closest("a,button,.urun");
            if (!hedef) return;

            const sepetButonu = event.target.closest(".sepet-btn,.detay-sepet");
            if (sepetButonu) {
                const urun = sepetButonu.classList.contains("detay-sepet")
                    ? detaydanUrun()
                    : karttanUrun(sepetButonu.closest(".urun"));
                if (urun) olayGonder("add_to_cart", urunParametreleri(urun));
                return;
            }

            const whatsapp = event.target.closest('a[href*="wa.me"]');
            if (whatsapp) {
                const urun = detaydanUrun();
                olayGonder("whatsapp_siparis", {
                    sayfa: sayfa,
                    urun_id: urun?.id || "",
                    urun_adi: urun?.ad || "",
                    value: urun?.fiyat || 0,
                    currency: "TRY"
                });
                return;
            }

            const urunKarti = event.target.closest(".urun");
            if (urunKarti && !event.target.closest("button,a")) {
                const urun = karttanUrun(urunKarti);
                if (urun) {
                    const bilgiler = urunParametreleri(urun);
                    bilgiler.item_list_name = "Ürünler";
                    olayGonder("select_item", bilgiler);
                }
            }
        });

        const siparisFormu = document.getElementById("siparisFormu");
        if (siparisFormu) {
            siparisFormu.addEventListener("submit", function () {
                const bilgiler = sepetParametreleri();
                if (!siparisFormu.checkValidity() || !bilgiler.items.length) return;
                olayGonder("begin_checkout", bilgiler);
                olayGonder("whatsapp_siparis", {
                    sayfa: "sepet",
                    urun_sayisi: bilgiler.items.length,
                    value: bilgiler.value,
                    currency: "TRY"
                });
            });
        }

        const ozelSiparisFormu = document.getElementById("ozelSiparisFormu");
        if (ozelSiparisFormu) {
            ozelSiparisFormu.addEventListener("submit", function () {
                if (!ozelSiparisFormu.checkValidity()) return;
                olayGonder("whatsapp_siparis", {
                    sayfa: "kisiye_ozel",
                    urun_adi: "Kişiye Özel Filografi"
                });
                olayGonder("generate_lead", {
                    lead_source: "whatsapp",
                    lead_type: "kisiye_ozel"
                });
            });
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", elayTicaretTakibiniBaslat);
    } else {
        elayTicaretTakibiniBaslat();
    }
})();

