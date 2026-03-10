document.addEventListener("DOMContentLoaded", () => {
/* ==================================================
   GSAP SETUP
================================================== */
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({
  ignoreMobileResize: true
});

gsap.defaults({
  ease: "power3.out"
});

/* ==================================================
   TEXT SPLIT (LINES)
================================================== */
function splitTextLines(element) {
  const text = element.innerHTML;
  element.innerHTML = "";

  text.split("<br>").forEach(line => {
    const wrap = document.createElement("div");
    wrap.classList.add("line");

    const span = document.createElement("span");
    span.innerHTML = line;

    wrap.appendChild(span);
    element.appendChild(wrap);
  });
}

document
  .querySelectorAll(".split-text")
  .forEach(splitTextLines);

/* ==================================================
   SECTION ENTER ANIMATIONS
================================================== */
gsap.utils.toArray(".panel").forEach(panel => {
  const content = panel.querySelector(".container") || panel;

  gsap.fromTo(
    panel,
    {
      scale: 0.92,
      opacity: 0,
      filter: "blur(12px)"
    },
    {
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.4,
      scrollTrigger: {
        trigger: panel,
        start: "top 85%",
        once: true
      }
    }
  );

  gsap.from(content, {
    y: 80,
    opacity: 0,
    duration: 1,
    delay: 0.15,
    scrollTrigger: {
      trigger: panel,
      start: "top 85%",
      once: true
    }
  });
});

/* ==================================================
   ABOUT IMAGE REVEAL
================================================== */
const aboutImage = document.querySelector(".about-image");
if (aboutImage) {
  gsap.from(aboutImage, {
    x: 60,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: ".panel-about",
      start: "top 70%",
      once: true
    }
  });
}

/* ==================================================
   WHAT I DO — PINNED HORIZONTAL SCROLL
================================================== */
const servicesSection = document.querySelector(".panel-services");

if (servicesSection) {
  const track = servicesSection.querySelector(".services-track");

  const getScrollAmount = () =>
    track.scrollWidth - window.innerWidth + window.innerWidth * 0.3;

  gsap.to(track, {
    x: () => -getScrollAmount(),
    ease: "none",
    scrollTrigger: {
      trigger: servicesSection,
      start: "top top",
      end: () => "+=" + getScrollAmount(),
      scrub: true,
      pin: true,
      invalidateOnRefresh: true
    }
  });
}

/* ==================================================
   PORTFOLIO — CARD REVEAL
================================================== */
const portfolioPanel = document.querySelector(".panel-portfolio");

if (portfolioPanel) {
  gsap.fromTo(
    ".portfolio-card",
    {
      y: 60,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      stagger: 0.15,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".panel-portfolio",
        start: "top 70%",
        once: true
      }
    }
  );
}

/* ==================================================
   PORTFOLIO MODAL
================================================== */
const modal = document.querySelector(".portfolio-modal");

if (modal) {
  const modalImg = modal.querySelector(".modal-img");
  const modalTitle = modal.querySelector(".modal-title");
  const modalType = modal.querySelector(".modal-type");
  const closeBtn = modal.querySelector(".modal-close");

  document
    .querySelectorAll(".portfolio-card")
    .forEach(card => {
      card.addEventListener("click", () => {
        modalImg.src = card.dataset.img;
        modalTitle.textContent = card.dataset.title;
        modalType.textContent = card.dataset.type;
        modal.classList.add("active");
      });
    });

  closeBtn?.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  modal.addEventListener("click", e => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });
}

/* ==================================================
   NAV — SMOOTH SCROLL + ACTIVE STATE
================================================== */
const navLinks = document.querySelectorAll(".nav-menu a");
const sections = document.querySelectorAll(".panel");

/* Smooth scroll */
navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const target = document.querySelector(
      link.getAttribute("href")
    );
    if (!target) return;

    const offset =
      document.querySelector(".main-nav")?.offsetHeight || 0;

    const top =
      target.getBoundingClientRect().top +
      window.pageYOffset -
      offset;

    window.scrollTo({
      top,
      behavior: "smooth"
    });
  });
});

/* Active link (ScrollTrigger-based) */
sections.forEach(section => {
  ScrollTrigger.create({
    trigger: section,
    start: "top center",
    end: "bottom center",
    onEnter: () => setActive(section.id),
    onEnterBack: () => setActive(section.id)
  });
});

function setActive(id) {
  navLinks.forEach(link => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${id}`
    );
  });
}

/* ==================================================
   RESUME — CARD REVEAL
================================================== */
const resumePanel = document.querySelector(".panel-resume");

if (resumePanel) {
  gsap.from(".resume-card", {
    y: 60,
    opacity: 0,
    stagger: 0.12,
    duration: 0.9,
    scrollTrigger: {
      trigger: resumePanel,
      start: "top 70%",
      once: true
    }
  });
}
/* ==================================================
   HAMBURGER
================================================== */
const burger = document.querySelector(".burger");
const mobileMenu = document.querySelector(".mobile-menu");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  mobileMenu.classList.toggle("active");
  document.body.classList.toggle("menu-open");
});

/* close on link click */
mobileMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    burger.classList.remove("active");
    mobileMenu.classList.remove("active");
    document.body.classList.remove("menu-open");
  });
});

window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});
});