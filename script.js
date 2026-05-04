// ===== Navigation =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
            link.classList.toggle('active', scrollY >= top && scrollY < top + height);
        }
    });
});

// ===== Scroll animations =====
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, observerOptions);

const animElements = document.querySelectorAll(
    '.story-card, .vision-card, .team-card, .solutions-content, .clients-showcase, .contact-info-card, .cta-card, .hero-content, .hero-visual, .section-header'
);
animElements.forEach((el, i) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = `${i % 4 * 0.1}s`;
    observer.observe(el);
});

// ===== Counter animation =====
const counters = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-count'));
            let current = 0;
            const increment = target / 40;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    entry.target.textContent = target;
                    clearInterval(timer);
                } else {
                    entry.target.textContent = Math.ceil(current);
                }
            }, 40);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
counters.forEach(counter => counterObserver.observe(counter));

// ===== Form handling =====
const form = document.getElementById('contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = document.getElementById('form-submit');
        btn.textContent = 'Message Sent! ✓';
        btn.style.background = 'linear-gradient(135deg, var(--green-start), var(--green-end))';
        setTimeout(() => {
            btn.innerHTML = 'Send Message <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
            btn.style.background = '';
            form.reset();
        }, 3000);
    });
}

// ===== Smooth scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
