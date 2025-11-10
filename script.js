// 🌙 Apparition au scroll
document.addEventListener("scroll", () => {
  const elements = document.querySelectorAll("section");
  const triggerBottom = window.innerHeight * 0.8;

  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < triggerBottom) {
      el.classList.add("visible");
    }
  });
});

// 🌗 Thème sombre/clair automatique + bouton de bascule
const toggleBtn = document.getElementById("theme-toggle");
const userTheme = localStorage.getItem("theme");

// change logos/images qui ont data-src-light / data-src-dark selon le thème
function setThemeLogos(theme) {
  document.querySelectorAll('img[data-src-light][data-src-dark]').forEach(img => {
    const light = img.dataset.srcLight;
    const dark = img.dataset.srcDark;
    if (!light || !dark) return;
    img.src = theme === "light" ? light : dark;
  });
}

// flèches (nom attendu + fallback si tu n'as pas renommé)
const darkArrow = "fleche_vers_le_bas_b.svg";
const lightArrowPrimary = "fleche_vers_le_bas_n.svg";
const lightArrowFallback = "flehce_vers_le_bas_n.svg";

const scrollArrow = document.getElementById("scroll-arrow");

// utilitaire pour définir la source (avec fallback)
function setArrowSrcForLight() {
  if (!scrollArrow) return;
  fetch(lightArrowPrimary, { method: "HEAD" })
    .then(res => {
      scrollArrow.src = res.ok ? lightArrowPrimary : lightArrowFallback;
    })
    .catch(() => {
      scrollArrow.src = lightArrowFallback;
    });
}
function setArrowForTheme(theme) {
  if (!scrollArrow) return;
  if (theme === "light") setArrowSrcForLight();
  else scrollArrow.src = darkArrow;
}

// Calculer et appliquer le thème initial UNE SEULE FOIS
const initialTheme = userTheme || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
document.body.classList.remove("light-theme", "dark-theme");
document.body.classList.add(initialTheme + "-theme");
setArrowForTheme(initialTheme);
setThemeLogos(initialTheme);

// Unique listener pour le toggle
toggleBtn?.addEventListener("click", () => {
  const currentIsDark = document.body.classList.contains("dark-theme");
  const target = currentIsDark ? "light" : "dark";
  document.body.classList.remove("light-theme", "dark-theme");
  document.body.classList.add(target + "-theme");
  localStorage.setItem("theme", target);
  setArrowForTheme(target);
  setThemeLogos(target);
});

// Suivre la préférence système si l'utilisateur n'a pas forcé de thème
const mq = window.matchMedia("(prefers-color-scheme: dark)");
mq.addEventListener?.('change', e => {
  if (localStorage.getItem("theme")) return; // override utilisateur => ne rien faire
  const newTheme = e.matches ? "dark" : "light";
  document.body.classList.remove("light-theme", "dark-theme");
  document.body.classList.add(newTheme + "-theme");
  setArrowForTheme(newTheme);
  setThemeLogos(newTheme);
});

// 🔽 Flèche : scroll vers "À propos" et disparition
const scrollDown = document.querySelector(".scroll-down");

if (scrollArrow && scrollDown) {
  // Clique sur la flèche → scroll + disparition
  scrollArrow.addEventListener("click", () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
    scrollDown.classList.add("hidden");
  });

  // Disparaît si on commence à scroller
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      scrollDown.classList.add("hidden");
    } else {
      scrollDown.classList.remove("hidden");
    }
  });
}