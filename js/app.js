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
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

// Function to open a clean document layout in a new tab for printing/saving as PDF
function openPrintView() {
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    showToast("Please allow popups to open the PDF view");
    return;
  }

  // Extract the core body content or format a clean document representation
  const portfolioHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Rocky John M. Bantolo — Resume & Portfolio</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
                body { font-family: 'Inter', sans-serif; background: white; color: #1e293b; padding: 2rem; max-width: 800px; margin: 0 auto; }
                h1 { font-size: 24px; font-weight: bold; }
                h2 { font-size: 16px; font-weight: bold; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; margin-top: 24px; text-transform: uppercase; color: #2563eb; }
                p, li { font-size: 13px; line-height: 1.5; color: #475569; }
                .no-print { display: none !important; }
            </style>
        </head>
        <body>
            <div style="display:flex; justify-content:space-between; align-items:flex-start; border-bottom: 2px solid #0f172a; padding-bottom: 1rem;">
                <div>
                    <h1>Rocky John M. Bantolo</h1>
                    <p style="font-weight: 500; color: #2563eb; margin-top: 2px;">C# / .NET Software Developer</p>
                </div>
                <div style="text-align: right; font-size: 12px;">
                    <p>Mandaluyong City, Philippines</p>
                    <p>rocky.bantolo@gmail.com | +63 961-408-8337</p>
                </div>
            </div>

            <h2>Professional Summary</h2>
            <p>C#/.NET Software Developer with nearly four years of professional experience building and maintaining business applications. Primary experience includes C# and .NET WinForms applications backed by MySQL, with additional experience in REST API integrations and ASP.NET Core applications.</p>

            <h2>Professional Experience</h2>
            <p><strong>Software Developer</strong> | Castles International Technology and Services Philippines, Inc. (Aug 2022 — Apr 2026)</p>
            <ul>
                <li>Developed a Finance Billing System supporting 17,000+ records, reducing reconciliation time from 1 month to 1 week.</li>
                <li>Built a Helpdesk System that centralized support tracking, resolution monitoring, and KPI reporting.</li>
                <li>Developed Report Builder transforming large transaction files into client reports in seconds.</li>
                <li>Optimized MySQL operations with stored procedures, views, triggers, indexing, and query optimization.</li>
            </ul>

            <h2>Technical Capabilities</h2>
            <p><strong>Languages & Frameworks:</strong> C#, .NET, WinForms, ASP.NET Core, Entity Framework Core, LINQ, Async/Await</p>
            <p><strong>Databases:</strong> MySQL, Stored Procedures, Views, Triggers, Indexing, Query Optimization</p>
            <p><strong>APIs & Tools:</strong> REST APIs, Swagger, Postman, Crystal Reports, PDF Generation, Git, GitHub</p>

            <h2>Credentials & Education</h2>
            <p><strong>Bachelor of Science in Information Technology</strong> — Jose Rizal University (2017 — 2023)</p>
            <p><strong>Software Development Training</strong> — ACLC Mandaluyong (2012 — 2014) | Focused on System Interfaces, Databases, Problem Solving, & Logical/Critical Thinking.</p>
            <p><strong>Honors:</strong> Programmer of the Year & Best in Thesis Award</p>

            <div style="margin-top: 40px; text-align: center;" class="no-print">
                <button onclick="window.print()" style="padding: 10px 20px; background: #2563eb; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">Print / Save as PDF</button>
            </div>
        </body>
        </html>
    `;

  printWindow.document.write(portfolioHTML);
  printWindow.document.close();
}

// (Existing IntersectionObserver, theme toggle, modal controllers, search, etc. remain here...)

document.addEventListener("keydown", (e) => {
  if (e.key === "t" || e.key === "T") {
    if (
      document.activeElement.tagName !== "INPUT" &&
      document.activeElement.tagName !== "TEXTAREA"
    ) {
      toggleTheme();
    }
  }
  if (e.key === "Escape") {
    document
      .querySelectorAll(".modal")
      .forEach((m) => m.classList.add("hidden"));
    document.body.style.overflow = "auto";
  }
});
