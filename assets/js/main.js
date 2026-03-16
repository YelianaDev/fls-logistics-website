// =====================
// FLS — main.js
// Yeliana DEV
// =====================
const EMAILJS_SERVICE_ID = "service_je0fy0q";
const EMAILJS_TEMPLATE_ID = "template_ly6lk3s";
const EMAILJS_PUBLIC_KEY = "t6vjndaEsedQHqBJ2";
// ── 1. NAVBAR scroll effect ──────────────────────────
const navbar = document.getElementById("navbar");
const navLogo = document.getElementById("nav-logo");

// Estado inicial del logo (antes del primer scroll)
navLogo.style.height = "96px";

window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    navbar.style.backgroundColor = "rgba(146, 63, 63, 0.97)";
    navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.4)";
    navLogo.style.height = "70px";
    navbar.classList.add("scrolled");
  } else {
    navbar.style.backgroundColor = "transparent";
    navbar.style.boxShadow = "none";
    navLogo.style.height = "96px";
    navbar.classList.remove("scrolled");
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

// ── 3. SCROLL REVEAL ────────────────────────────────
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

// ── 6. TABS DE SERVICIOS ─────────────────────────────
function showService(index) {
  document
    .querySelectorAll(".service-panel")
    .forEach((p) => p.classList.add("hidden"));
  document.querySelectorAll(".service-tab").forEach((t) => {
    t.classList.remove("border-fls-red", "text-fls-red");
    t.classList.add("border-transparent", "text-gray-500");
  });
  document.getElementById("panel-" + index).classList.remove("hidden");
  const activeTab = document.getElementById("tab-" + index);
  activeTab.classList.add("border-fls-red", "text-fls-red");
  activeTab.classList.remove("border-transparent", "text-gray-500");
}

// ── 7. LIGHTBOX ──────────────────────────────────────
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
// ── 8. EMAILJS — Inicialización ──────────────────────
emailjs.init(EMAILJS_PUBLIC_KEY);

// ── 9. FORMULARIO ────────────────────────────────────
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const formBtn = document.getElementById("form-btn");
const btnText = document.getElementById("btn-text");
const btnIcon = document.getElementById("btn-icon");

function setFormStatus(type, message) {
  formStatus.textContent = message;
  formStatus.className = "";
  formStatus.classList.add(
    "mb-4",
    "px-4",
    "py-3",
    "text-sm",
    "font-display",
    "font-semibold",
    "uppercase",
    "tracking-wider",
    type,
  );
  formStatus.classList.remove("hidden");
  setTimeout(() => formStatus.classList.add("hidden"), 6000);
}

function setButtonLoading(loading) {
  if (loading) {
    formBtn.disabled = true;
    btnText.textContent = "Enviando...";
    btnIcon.className = "fas fa-spinner fa-spin";
  } else {
    formBtn.disabled = false;
    btnText.textContent = "Enviar Mensaje";
    btnIcon.className = "fas fa-paper-plane";
  }
}

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("form-nombre").value.trim();
    const correo = document.getElementById("form-correo").value.trim();
    const telefono = document.getElementById("form-telefono").value.trim();
    const mensaje = document.getElementById("form-mensaje").value.trim();

    if (!nombre || !correo || !mensaje) {
      setFormStatus("error", "Por favor completa los campos obligatorios.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      setFormStatus("error", "Por favor ingresa un correo electrónico válido.");
      return;
    }

    setButtonLoading(true);

    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: nombre,
        from_email: correo,
        phone: telefono || "No proporcionado",
        message: mensaje,
      })
      .then(() => {
        setButtonLoading(false);
        setFormStatus("success", "✓ Mensaje enviado. Le contactaremos pronto.");
        contactForm.reset();
      })
      .catch((error) => {
        setButtonLoading(false);
        console.error("EmailJS error:", error);
        setFormStatus("error", "Error al enviar. Contáctenos por WhatsApp.");
      });
  });
}
