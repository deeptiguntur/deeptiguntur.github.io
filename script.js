
// Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    toggle.classList.toggle('active');
});
navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    toggle.classList.remove('active');
    });
});

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Active nav link
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 130) cur = s.id; });
    navAs.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + cur) a.classList.add('active');
    });
});

// Collapsible experience cards
// On mobile, start all collapsed. On desktop, all expanded.
function isMobile() { return window.innerWidth <= 820; }

function initCollapsible() {
    document.querySelectorAll('.exp-card[data-collapsible]').forEach(card => {
    const toggle = card.querySelector('.exp-toggle');
    const body = card.querySelector('.exp-body');
    const chevron = card.querySelector('.exp-chevron');

    if (isMobile()) {
        body.style.maxHeight = '0';
        body.style.overflow = 'hidden';
        toggle.setAttribute('aria-expanded', 'false');
        card.classList.add('collapsed');
    } else {
        body.style.maxHeight = 'none';
        toggle.setAttribute('aria-expanded', 'true');
        card.classList.remove('collapsed');
    }

    toggle.addEventListener('click', () => {
        if (!isMobile()) return; // no-op on desktop
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        if (expanded) {
        body.style.maxHeight = body.scrollHeight + 'px';
        requestAnimationFrame(() => { body.style.maxHeight = '0'; });
        toggle.setAttribute('aria-expanded', 'false');
        card.classList.add('collapsed');
        } else {
        body.style.maxHeight = body.scrollHeight + 'px';
        toggle.setAttribute('aria-expanded', 'true');
        card.classList.remove('collapsed');
        // After transition, remove fixed height so content can reflow
        body.addEventListener('transitionend', () => {
            if (toggle.getAttribute('aria-expanded') === 'true') body.style.maxHeight = 'none';
        }, { once: true });
        }
    });

    toggle.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle.click(); }
    });
    });
}

initCollapsible();
window.addEventListener('resize', initCollapsible);