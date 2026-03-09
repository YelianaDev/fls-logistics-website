// =====================
// FLS — main.js
// Yeliana DEV
// =====================

// ── 1. NAVBAR scroll effect ──────────────────────────
const navbar = document.getElementById("navbar");
const navLogo = document.getElementById("nav-logo");

window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    navbar.style.backgroundColor = "#012355";
    navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.4)";
    navbar.style.paddingTop = "0";
    navLogo.style.height = "80px";
  } else {
    navbar.style.backgroundColor = "transparent";
    navbar.style.boxShadow = "none";
    navLogo.style.height = "120px";
  }
});

// ── 2. MENÚ HAMBURGUESA ──────────────────────────────
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
});

// ── 3. SCROLL REVEAL (elementos que aparecen) ────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);

document.querySelectorAll(".scroll-reveal").forEach((el) => {
  revealObserver.observe(el);
});

// ── 4. SERVICE CARD hover bar ────────────────────────
document.querySelectorAll(".service-card").forEach((card) => {
  const bar = card.querySelector(".service-bar");
  card.addEventListener("mouseenter", () => {
    bar.style.width = "100%";
  });
  card.addEventListener("mouseleave", () => {
    bar.style.width = "0";
  });
});

// ── 5. CONTADORES animados ───────────────────────────
const counters = document.querySelectorAll(".counter");
let countersStarted = false;

const counterObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && !countersStarted) {
      countersStarted = true;
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-target"));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const update = () => {
          current += step;
          if (current < target) {
            counter.textContent = Math.floor(current) + "+";
            requestAnimationFrame(update);
          } else {
            counter.textContent = target + "+";
          }
        };
        requestAnimationFrame(update);
      });
    }
  },
  { threshold: 0.5 },
);

if (counters.length > 0) {
  counterObserver.observe(counters[0].closest("section") || counters[0]);
}

// ── 7. TABS DE SERVICIOS ─────────────────────────────
function showService(index) {
  // Ocultar todos los paneles
  document
    .querySelectorAll(".service-panel")
    .forEach((p) => p.classList.add("hidden"));
  // Resetear todos los tabs
  document.querySelectorAll(".service-tab").forEach((t) => {
    t.classList.remove("border-fls-red", "text-fls-red");
    t.classList.add("border-transparent", "text-gray-500");
  });
  // Mostrar panel activo
  document.getElementById("panel-" + index).classList.remove("hidden");
  // Activar tab
  const activeTab = document.getElementById("tab-" + index);
  activeTab.classList.add("border-fls-red", "text-fls-red");
  activeTab.classList.remove("border-transparent", "text-gray-500");
}

// ── 8. LIGHTBOX ──────────────────────────────────────
function openLightbox(src) {
  document.getElementById("lightbox-img").src = src;
  const lb = document.getElementById("lightbox");
  lb.classList.remove("hidden");
  lb.classList.add("flex");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const lb = document.getElementById("lightbox");
  lb.classList.add("hidden");
  lb.classList.remove("flex");
  document.body.style.overflow = "";
}
