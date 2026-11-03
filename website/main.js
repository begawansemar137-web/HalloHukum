// Base URL of the HalloHukum web app (HashRouter). Change this once the app's domain is final.
const APP_URL = 'https://hallohukum.com/#';

document.documentElement.classList.add('js');

document.querySelectorAll('[data-app]').forEach((link) => {
  link.href = APP_URL + link.dataset.app;
});

document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu
const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('main-nav');
function setMenu(open) {
  nav.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.querySelector('.sr-only').textContent = open ? 'Tutup menu' : 'Buka menu';
}
toggle.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
nav.addEventListener('click', (e) => {
  if (e.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav.classList.contains('open')) {
    setMenu(false);
    toggle.focus();
  }
});

// Hero answer assembles once it is on screen
const answer = document.querySelector('.answer');
new IntersectionObserver((entries, obs) => {
  if (entries[0].isIntersecting) {
    answer.classList.add('play');
    obs.disconnect();
  }
}, { threshold: 0.3 }).observe(answer);

// Audience tabs (WAI-ARIA tabs pattern)
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(tab) {
  tabs.forEach((t) => {
    const selected = t === tab;
    t.setAttribute('aria-selected', String(selected));
    t.tabIndex = selected ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !selected;
  });
}
tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', (e) => {
    const next = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const target = tabs[(next + tabs.length) % tabs.length];
    selectTab(target);
    target.focus();
  });
});
