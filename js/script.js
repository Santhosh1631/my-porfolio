const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const savedTheme = localStorage.getItem('theme') || 'light';
body.dataset.theme = savedTheme;

themeToggle.addEventListener('click', () => {
    const theme = body.dataset.theme === 'dark' ? 'light' : 'dark';
    body.dataset.theme = theme;
    localStorage.setItem('theme', theme);
});

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('is-open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

const revealItems = document.querySelectorAll('.section-heading, .project-card, .article-card, .skill-category, .timeline-item, .contact-inner');
const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            instance.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealItems.forEach((item) => observer.observe(item));
