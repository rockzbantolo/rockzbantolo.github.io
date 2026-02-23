"use strict";

(function () {
  // Show More / Show Less
  "use strict";

  const COLLAPSED_LINES = 3; // <-- set the number of lines you want collapsed

  document.querySelectorAll(".project-card .show-more").forEach((button) => {
    const card = button.closest(".project-card");
    const description = card.querySelector(".description");
    if (!card || !description) return;

    // Initial collapsed state
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
    element.offsetHeight; // force reflow
    element.style.height = `${targetHeight}px`;

    element.addEventListener(
      "transitionend",
      () => {
        element.style.height = "auto"; // let it fully expand naturally
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
    element.offsetHeight; // force reflow
    element.style.height = `${targetHeight}px`;
  }

  // Footer year
  function setFooterYear() {
    const yearElement = document.getElementById("year");
    if (!yearElement) return;
    yearElement.textContent = new Date().getFullYear();
  }

  // Fade-in observer
  function initFadeInObserver() {
    const elements = document.querySelectorAll(".fade-in");
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target;
          if (entry.isIntersecting) {
            el.classList.add("visible");
          } else {
            // remove class when out of view to allow re-animation
            el.classList.remove("visible");
          }
        }
      },
      { threshold: 0.15 },
    );
    for (const el of elements) {
      observer.observe(el);
    }
  }

  // Back to top
  function initBackToTop() {
    const button = document.getElementById("back-to-top");
    if (!button) return;

    window.addEventListener("scroll", () => {
      button.style.display = window.scrollY > 300 ? "flex" : "none";
    });

    button.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function init() {
    setFooterYear();
    // Delay fade-in init until page fully loaded
    window.addEventListener("load", initFadeInObserver);
    initBackToTop();
  }

  init();
})();
