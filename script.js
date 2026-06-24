const menuToggle = document.querySelector("#menuToggle");
const menuNav = document.querySelector("#menuNav");
const menuLinks = document.querySelectorAll(".menu-nav a");
const revealItems = document.querySelectorAll(".reveal");
const yearEl = document.querySelector("#year");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (menuToggle && menuNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      obs.unobserve(entry.target);
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -20px 0px",
  }
);

revealItems.forEach((item) => observer.observe(item));
