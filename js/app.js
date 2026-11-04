const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, observerOptions);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

window.addEventListener("scroll", () => {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("progress-bar").style.width = scrolled + "%";
});

function toggleTheme() {
  const html = document.documentElement;
  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    html.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
}

if (localStorage.getItem("theme") === "light") {
  document.documentElement.classList.remove("dark");
}

function copyText(text, message) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(message);
  });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");
  toastMessage.textContent = message;
  toast.classList.remove("translate-y-20", "opacity-0");
  setTimeout(() => {
    toast.classList.add("translate-y-20", "opacity-0");
  }, 3000);
}

// Command Palette Trigger
function toggleCommandPalette() {
  const palette = document.getElementById("cmd-palette");
  if (palette.classList.contains("hidden")) {
    palette.classList.remove("hidden");
    document.getElementById("cmd-input").focus();
  } else {
    palette.classList.add("hidden");
  }
}

function jumpToSection(selector) {
  toggleCommandPalette();
  const el = document.querySelector(selector);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

// Skill Group Filter Tabs
function filterSkillGroup(group) {
  const skillGroups = document.querySelectorAll(".skill-group");
  const catBtns = document.querySelectorAll(".skill-cat-btn");

  catBtns.forEach((btn) => {
    if (btn.getAttribute("data-cat") === group) {
      btn.className =
        "skill-cat-btn px-3 py-1.5 rounded-lg bg-brand-600 text-white shadow-sm font-medium";
    } else {
      btn.className =
        "skill-cat-btn px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white";
    }
  });

  skillGroups.forEach((sg) => {
    if (group === "all" || sg.getAttribute("data-group") === group) {
      sg.style.display = "block";
    } else {
      sg.style.display = "none";
    }
  });
}

function updateProjectCounts() {
  const cards = [...document.querySelectorAll(".project-card")];
  const counts = {
    all: cards.length,
    professional: cards.filter((card) => card.dataset.category === "professional").length,
    personal: cards.filter((card) => card.dataset.category === "personal").length,
  };

  document.querySelectorAll("[data-project-count]").forEach((element) => {
    const category = element.dataset.projectCount;
    element.textContent = counts[category] ?? 0;
  });

  const total = document.getElementById("project-total-count");
  if (total) total.textContent = counts.all;

  // Keep the header navigation count synchronized with the project cards.
  document.querySelectorAll("[data-project-nav-count]").forEach((element) => {
    element.textContent = counts.all;
  });
}

function filterProjects(category) {
  const cards = document.querySelectorAll(".project-card");
  const filterBtns = document.querySelectorAll(".project-filter-btn");

  filterBtns.forEach((btn) => {
    if (btn.getAttribute("data-filter") === category) {
      btn.className =
        "project-filter-btn px-3 py-1 rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-medium";
    } else {
      btn.className =
        "project-filter-btn px-3 py-1 rounded-md text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white";
    }
  });

  cards.forEach((card) => {
    if (category === "all" || card.getAttribute("data-category") === category) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}

updateProjectCounts();

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";
  }
}

function searchSkills() {
  const input = document.getElementById("skill-search").value.toLowerCase();
  const skillItems = document.querySelectorAll(".skill-item");

  skillItems.forEach((item) => {
    const text = item.textContent.toLowerCase();
    if (text.includes(input)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

// Global Keyboard Shortcuts (Ctrl+K / Cmd+K, T for theme, ESC for modals)
document.addEventListener("keydown", (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    toggleCommandPalette();
  }
  if (e.key === "t" || e.key === "T") {
    if (
      document.activeElement.tagName !== "INPUT" &&
      document.activeElement.tagName !== "TEXTAREA"
    ) {
      toggleTheme();
    }
  }
  if (e.key === "Escape") {
    const galleryModal = document.getElementById("gallery-modal");
    const lightbox = document.getElementById("gallery-lightbox");
    if (galleryModal) {
      if (lightbox && !lightbox.classList.contains("hidden")) closeLightbox();
      else closeGalleryModal();
      return;
    }
    document.querySelectorAll(".modal").forEach((m) => m.classList.add("hidden"));
    const palette = document.getElementById("cmd-palette");
    if (palette) palette.classList.add("hidden");
    document.body.style.overflow = "auto";
  }
  if (document.getElementById("gallery-lightbox") && !document.getElementById("gallery-lightbox").classList.contains("hidden")) {
    if (e.key === "ArrowLeft") navigateLightbox(-1);
    if (e.key === "ArrowRight") navigateLightbox(1);
  }
});// Data model configuration

// Data model configuration
const leaveManagementGallery = [
  {
    title: "Login & Authentication",
    src: "assets/projects/leave-management/Login.png",
    category: "Auth",
  },
  {
    title: "User Dashboard",
    src: "assets/projects/leave-management/Users_Dashboard.png",
    category: "User",
  },
  {
    title: "Apply For Leave",
    src: "assets/projects/leave-management/Users_Apply_Leave.png",
    category: "User",
  },
  {
    title: "My Requests",
    src: "assets/projects/leave-management/User_Leave_Request.png",
    category: "User",
  },
  {
    title: "Leave Balance",
    src: "assets/projects/leave-management/Users_Leave_Balance.png",
    category: "User",
  },
  {
    title: "My Calendar",
    src: "assets/projects/leave-management/Users_Calendar.png",
    category: "User",
  },
  {
    title: "Manager Dashboard",
    src: "assets/projects/leave-management/Manager_Dashboard.png",
    category: "Manager",
  },
  {
    title: "Manager Approvals",
    src: "assets/projects/leave-management/Manager_Approvals.png",
    category: "Manager",
  },
  {
    title: "Team Overview",
    src: "assets/projects/leave-management/Manager_Team_Overview.png",
    category: "Manager",
  },
  {
    title: "Manager Reports",
    src: "assets/projects/leave-management/Manager_Reports.png",
    category: "Manager",
  },
  {
    title: "HR Dashboard",
    src: "assets/projects/leave-management/HR_Dashboard.png",
    category: "HR",
  },
  {
    title: "HR Approvals",
    src: "assets/projects/leave-management/HR_Approvals.png",
    category: "HR",
  },
  {
    title: "Approval History",
    src: "assets/projects/leave-management/HR_Approval_History.png",
    category: "HR",
  },
  {
    title: "Employee Directory",
    src: "assets/projects/leave-management/HR_Employees.png",
    category: "HR",
  },
  {
    title: "HR Reports",
    src: "assets/projects/leave-management/HR_Reports.png",
    category: "HR",
  },
];


const serviceManagementGallery = [
  { title: "Overview Dashboard", src: "assets/projects/service-management/overview.jpg", category: "Overview" },
  { title: "Live Operations", src: "assets/projects/service-management/live-operation.jpg", category: "Live Operation" },
  { title: "Activity Timeline", src: "assets/projects/service-management/activity.jpg", category: "Activity" },
  { title: "Workflow Monitoring", src: "assets/projects/service-management/workflow.jpg", category: "Workflow" },
  { title: "Team Performance", src: "assets/projects/service-management/team.jpg", category: "Team" },
  { title: "Service Quality", src: "assets/projects/service-management/service-quality.jpg", category: "Service Quality" },
  { title: "Performance Metrics", src: "assets/projects/service-management/performance.jpg", category: "Performance" },
  { title: "Inventory Management", src: "assets/projects/service-management/inventory.jpg", category: "Inventory" },
  { title: "System Monitoring", src: "assets/projects/service-management/system.jpg", category: "System" },
  { title: "Login & Authentication", src: "assets/projects/service-management/login.jpg", category: "Authentication" },
];

let currentGalleryItems = leaveManagementGallery;
let currentGalleryTitle = "Leave Management System";
let currentGalleryDescription = "Screenshots of employee, manager, and HR workflows";

// Leave Management project gallery
let activeFilter = "All";
let currentLightboxIndex = 0;

function openGalleryModal(project = "leave") {
  if (document.getElementById("gallery-modal")) return;
  currentGalleryItems = project === "service" ? serviceManagementGallery : leaveManagementGallery;
  currentGalleryTitle = project === "service" ? "Service Management System" : "Leave Management System";
  currentGalleryDescription = project === "service"
    ? "Admin interface organized into dashboard sections and workflows"
    : "Screenshots of employee, manager, and HR workflows";
  activeFilter = "All";
  const modal = document.createElement("section");
  modal.id = "gallery-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "gallery-title");
  modal.className = "fixed inset-0 z-[70] bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 flex flex-col overflow-hidden";
  modal.innerHTML = `
    <div class="shrink-0 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md">
      <div class="max-w-7xl w-full mx-auto px-4 sm:px-6 py-5 flex items-start justify-between gap-4">
        <div class="min-w-0">
          <div class="flex items-center gap-2 mb-2">
            <span class="w-2 h-2 rounded-full bg-brand-500"></span>
            <span class="text-[11px] font-mono font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">Project Showcase</span>
          </div>
          <h2 id="gallery-title" class="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"><span id="gallery-project-name">${currentGalleryTitle}</span></h2>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">${currentGalleryDescription}</p>
        </div>
        <button type="button" onclick="closeGalleryModal()" aria-label="Close gallery" class="shrink-0 p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:border-brand-500 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
    </div>
    <div class="shrink-0 border-b border-slate-200 dark:border-slate-800">
      <div class="max-w-7xl mx-auto w-full px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div id="gallery-filters" class="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0" aria-label="Filter screenshots">
          ${["All", ...new Set(currentGalleryItems.map((item) => item.category))].map((cat) => `
            <button type="button" data-gallery-filter="${cat}" onclick="filterGallery('${cat}')" class="gallery-filter shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${cat === "All" ? "bg-brand-600 border-brand-600 text-white" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-brand-500 hover:text-brand-500"}">${cat}</button>
          `).join("")}
        </div>
        <p id="gallery-count" class="text-[11px] font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap">${currentGalleryItems.length} screenshots</p>
      </div>
    </div>
    <div class="flex-1 min-h-0 overflow-y-auto">
      <div class="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8">
        <div id="gallery-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"></div>
      </div>
    </div>
    <div class="shrink-0 border-t border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-3 text-center bg-white dark:bg-slate-950">
      <p class="text-[10px] font-mono text-slate-400">Select a screenshot to enlarge · Use ← → to navigate · ESC to close</p>
    </div>
    <div id="gallery-lightbox" class="hidden fixed inset-0 z-[80] bg-slate-950/95 backdrop-blur-sm flex flex-col items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Screenshot preview">
      <div class="absolute top-0 left-0 right-0 flex items-center justify-between p-4 sm:p-6">
        <span id="lightbox-counter" class="text-xs font-mono text-slate-400"></span>
        <button type="button" onclick="closeLightbox()" aria-label="Close preview" class="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
      </div>
      <button type="button" onclick="navigateLightbox(-1)" aria-label="Previous screenshot" class="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full text-white bg-white/10 hover:bg-brand-600 transition-colors"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 18l-6-6 6-6"></path></svg></button>
      <img id="lightbox-img" src="" alt="" class="max-w-[88vw] max-h-[76vh] object-contain rounded-lg border border-slate-700 shadow-2xl" />
      <div class="text-center mt-4 px-12">
        <p id="lightbox-caption" class="text-base sm:text-lg font-semibold text-white"></p>
        <p id="lightbox-category" class="text-xs font-mono text-slate-400 mt-1"></p>
      </div>
      <button type="button" onclick="navigateLightbox(1)" aria-label="Next screenshot" class="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full text-white bg-white/10 hover:bg-brand-600 transition-colors"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 18l6-6-6-6"></path></svg></button>
    </div>
  `;
  document.body.appendChild(modal);
  document.body.style.overflow = "hidden";
  renderGalleryItems();
  modal.querySelector("[data-gallery-filter='All']").focus();
}

function renderGalleryItems() {
  const visibleItems = currentGalleryItems
    .map((item, index) => ({ ...item, originalIndex: index }))
    .filter((item) => activeFilter === "All" || item.category === activeFilter);
  const grid = document.getElementById("gallery-grid");
  if (!grid) return;
  grid.innerHTML = visibleItems.map((item) => `
    <button type="button" onclick="openLightbox(${item.originalIndex})" class="group text-left overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-brand-500/60 hover:shadow-lg hover:shadow-brand-500/5 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500">
      <div class="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-950">
        <img src="${item.src}" alt="${item.title}" loading="lazy" class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity"></div>
        <span class="absolute top-3 left-3 px-2 py-1 rounded-md bg-slate-950/75 text-white text-[10px] font-mono backdrop-blur-sm">${item.category}</span>
        <span class="absolute bottom-3 right-3 w-8 h-8 rounded-lg bg-white/90 text-slate-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 3h6v6M10 14L21 3M21 14v7H3V3h7"></path></svg></span>
      </div>
      <div class="px-3.5 py-3 flex items-center justify-between gap-2">
        <span class="text-sm font-semibold text-slate-800 dark:text-slate-100">${item.title}</span>
        <svg class="w-4 h-4 shrink-0 text-slate-400 group-hover:text-brand-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
      </div>
    </button>
  `).join("");
  const count = document.getElementById("gallery-count");
  if (count) count.textContent = `${visibleItems.length} ${visibleItems.length === 1 ? "screenshot" : "screenshots"}`;
}

function filterGallery(category) {
  activeFilter = category;
  document.querySelectorAll(".gallery-filter").forEach((button) => {
    const selected = button.dataset.galleryFilter === category;
    button.className = `gallery-filter shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${selected ? "bg-brand-600 border-brand-600 text-white" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-brand-500 hover:text-brand-500"}`;
    button.setAttribute("aria-pressed", String(selected));
  });
  renderGalleryItems();
}

function getVisibleGalleryItems() {
  return currentGalleryItems
    .map((item, index) => ({ ...item, originalIndex: index }))
    .filter((item) => activeFilter === "All" || item.category === activeFilter);
}

function openLightbox(index) {
  if (index < 0 || index >= currentGalleryItems.length) return;
  currentLightboxIndex = index;
  const item = currentGalleryItems[index];
  const visibleItems = getVisibleGalleryItems();
  const visiblePosition = visibleItems.findIndex((entry) => entry.originalIndex === index);
  const image = document.getElementById("lightbox-img");
  image.src = item.src;
  image.alt = item.title;
  document.getElementById("lightbox-caption").textContent = item.title;
  document.getElementById("lightbox-category").textContent = item.category;
  document.getElementById("lightbox-counter").textContent = `${visiblePosition + 1} / ${visibleItems.length}`;
  document.getElementById("gallery-lightbox").classList.remove("hidden");
}

function closeLightbox() {
  const lightbox = document.getElementById("gallery-lightbox");
  if (lightbox) lightbox.classList.add("hidden");
}

function navigateLightbox(direction) {
  const visibleItems = getVisibleGalleryItems();
  if (!visibleItems.length) return;
  const currentPosition = visibleItems.findIndex((item) => item.originalIndex === currentLightboxIndex);
  const nextPosition = (currentPosition + direction + visibleItems.length) % visibleItems.length;
  openLightbox(visibleItems[nextPosition].originalIndex);
}

function closeGalleryModal() {
  const modal = document.getElementById("gallery-modal");
  if (modal) modal.remove();
  document.body.style.overflow = "auto";
}
