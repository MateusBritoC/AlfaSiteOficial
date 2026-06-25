const menuToggle = document.querySelector("#menuToggle");
const menuNav = document.querySelector("#menuNav");
const menuLinks = document.querySelectorAll(".menu-nav a");
const revealItems = document.querySelectorAll(".reveal");
const yearEl = document.querySelector("#year");
const hardwareSprites = document.querySelectorAll(".hardware-sprite");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

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

const revealGroups = [
  ".service-grid .reveal",
  ".plans-grid .reveal",
  ".team-grid .reveal",
  ".plans-highlights .reveal",
];

revealGroups.forEach((selector) => {
  const groupItems = document.querySelectorAll(selector);
  groupItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 90, 420)}ms`;
  });
});

if (hardwareSprites.length > 0 && !prefersReducedMotion.matches) {
  const updateHardwareParallax = () => {
    const scrollY = window.scrollY || window.pageYOffset;

    hardwareSprites.forEach((sprite) => {
      const speed = Number(sprite.dataset.speed || 0.05);
      const tilt = Number(sprite.dataset.tilt || 0);
      const offsetY = Math.round(scrollY * speed);
      const driftX = Math.sin(scrollY * 0.0025 + speed * 10) * 8;
      sprite.style.transform = `translate3d(${driftX.toFixed(2)}px, ${offsetY}px, 0) rotate(${tilt}deg)`;
    });
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      updateHardwareParallax();
      ticking = false;
    });
  };

  updateHardwareParallax();
  window.addEventListener("scroll", onScroll, { passive: true });
}

revealItems.forEach((item) => observer.observe(item));
