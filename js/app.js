const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('progress-bar').style.width = scrolled + '%';
});

function toggleTheme() {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}

if (localStorage.getItem('theme') === 'light') {
    document.documentElement.classList.remove('dark');
}

function copyText(text, message) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(message);
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    toastMessage.textContent = message;
    toast.classList.remove('translate-y-20', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
}

// Command Palette Trigger
function toggleCommandPalette() {
    const palette = document.getElementById('cmd-palette');
    if (palette.classList.contains('hidden')) {
        palette.classList.remove('hidden');
        document.getElementById('cmd-input').focus();
    } else {
        palette.classList.add('hidden');
    }
}

function jumpToSection(selector) {
    toggleCommandPalette();
    const el = document.querySelector(selector);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
    }
}

// Skill Group Filter Tabs
function filterSkillGroup(group) {
    const skillGroups = document.querySelectorAll('.skill-group');
    const catBtns = document.querySelectorAll('.skill-cat-btn');

    catBtns.forEach(btn => {
        if (btn.getAttribute('data-cat') === group) {
            btn.className = "skill-cat-btn px-3 py-1.5 rounded-lg bg-brand-600 text-white shadow-sm font-medium";
        } else {
            btn.className = "skill-cat-btn px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white";
        }
    });

    skillGroups.forEach(sg => {
        if (group === 'all' || sg.getAttribute('data-group') === group) {
            sg.style.display = 'block';
        } else {
            sg.style.display = 'none';
        }
    });
}

function filterProjects(category) {
    const cards = document.querySelectorAll('.project-card');
    const filterBtns = document.querySelectorAll('.project-filter-btn');

    filterBtns.forEach(btn => {
        if (btn.getAttribute('data-filter') === category) {
            btn.className = "project-filter-btn px-3 py-1 rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-medium";
        } else {
            btn.className = "project-filter-btn px-3 py-1 rounded-md text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white";
        }
    });

    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function searchSkills() {
    const input = document.getElementById('skill-search').value.toLowerCase();
    const skillItems = document.querySelectorAll('.skill-item');

    skillItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(input)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Global Keyboard Shortcuts (Ctrl+K / Cmd+K, T for theme, ESC for modals)
document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        toggleCommandPalette();
    }
    if (e.key === 't' || e.key === 'T') {
        if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            toggleTheme();
        }
    }
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
        document.getElementById('cmd-palette').classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
});