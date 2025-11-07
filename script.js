// Apparition au scroll
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

// Thème sombre/clair automatique + bouton de bascule
const toggleBtn = document.getElementById("theme-toggle");
const userTheme = localStorage.getItem("theme");

// Appliquer le thème sauvegardé si présent
if (userTheme === "light") {
  document.body.classList.add("light-theme");
} else if (userTheme === "dark") {
  document.body.classList.add("dark-theme");
}

// Bascule au clic
toggleBtn.addEventListener("click", () => {
  if (document.body.classList.contains("dark-theme")) {
    document.body.classList.replace("dark-theme", "light-theme");
    localStorage.setItem("theme", "light");
  } else if (document.body.classList.contains("light-theme")) {
    document.body.classList.replace("light-theme", "dark-theme");
    localStorage.setItem("theme", "dark");
  } else {
    // Si aucun thème explicite, basculer à partir du mode du système
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) {
      document.body.classList.add("light-theme");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    }
  }
});
