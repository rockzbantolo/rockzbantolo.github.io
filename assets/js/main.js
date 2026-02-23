"use strict";

(function () {
  // ─────────────────────────────────────────────────────────────
  // Show More / Show Less
  // ─────────────────────────────────────────────────────────────
  const COLLAPSED_LINES = 3;

  document.querySelectorAll(".project-card .show-more").forEach((button) => {
    const card = button.closest(".project-card");
    const description = card.querySelector(".description");
    if (!card || !description) return;

    collapse(description, COLLAPSED_LINES);

    button.addEventListener("click", () => {
      const isExpanded = card.classList.contains("expanded");
      if (!isExpanded) {
        expand(description);
        card.classList.add("expanded");
        button.textContent = "Show less";
      } else {
        collapse(description, COLLAPSED_LINES);
        card.classList.remove("expanded");
        button.textContent = "Show more";
      }
    });
  });

  function expand(element) {
    const startHeight = element.offsetHeight;
    const targetHeight = element.scrollHeight;
    element.style.height = `${startHeight}px`;
    element.offsetHeight;
    element.style.height = `${targetHeight}px`;
    element.addEventListener(
      "transitionend",
      () => {
        element.style.height = "auto";
      },
      { once: true },
    );
  }

  function collapse(element, lines) {
    const computed = window.getComputedStyle(element);
    const lineHeight = parseFloat(computed.lineHeight);
    const targetHeight = lineHeight * lines;
    const startHeight = element.scrollHeight;
    element.style.height = `${startHeight}px`;
    element.offsetHeight;
    element.style.height = `${targetHeight}px`;
  }

  // ─────────────────────────────────────────────────────────────
  // Image Modal
  // ─────────────────────────────────────────────────────────────
  function initImageModal() {
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-image");

    if (!modal || !modalImg) {
      console.error("[Modal] #image-modal or #modal-image missing");
      return;
    }

    let isOpening = false;

    // Open on thumbnail click
    document.querySelectorAll(".project-img-wrapper img").forEach((img) => {
      img.addEventListener("click", () => {
        if (isOpening) return;
        isOpening = true;

        modalImg.src = img.currentSrc || img.src;
        modalImg.alt = img.alt || "Enlarged project image";
        modal.showModal();
        modalImg.focus();

        setTimeout(() => {
          isOpening = false;
        }, 300);
      });
    });

    // Close on backdrop click
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.close();
      }
    });

    // Close on button click
    const closeBtn = modal.querySelector(".modal-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        modal.close();
      });
    }

    // Cleanup after close
    modal.addEventListener("close", () => {
      modalImg.src = ""; // break image reference
      document.body.style.overflow = ""; // restore scroll
      isOpening = false;
    });
  }

  // ─────────────────────────────────────────────────────────────
  // Footer year
  // ─────────────────────────────────────────────────────────────
  function setFooterYear() {
    const el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }

  // ─────────────────────────────────────────────────────────────
  // Fade-in observer
  // ─────────────────────────────────────────────────────────────
  function initFadeInObserver() {
    const elements = document.querySelectorAll(".fade-in");
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("visible", entry.isIntersecting);
        });
      },
      { threshold: 0.15 },
    );

    elements.forEach((el) => observer.observe(el));
  }

  // ─────────────────────────────────────────────────────────────
  // Back to top
  // ─────────────────────────────────────────────────────────────
  function initBackToTop() {
    const btn = document.getElementById("back-to-top");
    if (!btn) return;

    window.addEventListener("scroll", () => {
      btn.style.display = window.scrollY > 300 ? "flex" : "none";
    });

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ─────────────────────────────────────────────────────────────
  // Main init
  // ─────────────────────────────────────────────────────────────
  function init() {
    setFooterYear();
    initFadeInObserver();
    initBackToTop();
    initImageModal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
