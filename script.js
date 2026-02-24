/* ===========================
   LOADER
   =========================== */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('hidden'), 900);
});

/* ===========================
   TABS
   =========================== */
const navBtns = document.querySelectorAll('.nav-btn');
const panes   = document.querySelectorAll('.tab-pane');

function switchTab(name) {
  navBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === name));
  panes.forEach(p => {
    const on = p.id === name;
    p.classList.toggle('active', on);
    if (on) { p.style.animation = 'none'; p.offsetHeight; p.style.animation = ''; }
  });
  // close mobile sidebar
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
  document.getElementById('hamburger').classList.remove('open');
}

navBtns.forEach(b => b.addEventListener('click', () => switchTab(b.dataset.tab)));
window.switchTab = switchTab;

// keyboard shortcuts Ctrl+1..5
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '5') {
    e.preventDefault();
    switchTab(['home','about','skills','certifications','contact'][+e.key - 1]);
  }
});

/* ===========================
   MOBILE SIDEBAR
   =========================== */
const hamburger = document.getElementById('hamburger');
const sidebar   = document.getElementById('sidebar');
const overlay   = document.getElementById('overlay');

hamburger.addEventListener('click', () => {
  const open = sidebar.classList.toggle('open');
  overlay.classList.toggle('show', open);
  hamburger.classList.toggle('open', open);
});
overlay.addEventListener('click', () => {
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
  hamburger.classList.remove('open');
});

/* ===========================
   TYPING EFFECT
   =========================== */
const words = ['Tech Enthusiast', 'Software Developer', 'Data Learner', 'Problem Solver'];
let wi = 0, ci = 0, deleting = false;
const el = document.getElementById('typed');

function typeLoop() {
  const word = words[wi];
  if (deleting) {
    el.textContent = word.slice(0, --ci);
    if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; setTimeout(typeLoop, 450); return; }
    setTimeout(typeLoop, 60);
  } else {
    el.textContent = word.slice(0, ++ci);
    if (ci === word.length) { deleting = true; setTimeout(typeLoop, 2000); return; }
    setTimeout(typeLoop, 120);
  }
}
setTimeout(typeLoop, 1500);

/* ===========================
   CONTACT FORM
   =========================== */
document.getElementById('contactForm').addEventListener('submit', async e => {
  e.preventDefault();
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const msg     = document.getElementById('message').value.trim();
  const status  = document.getElementById('formStatus');

  if (!name || !email || !subject || !msg) {
    status.textContent = 'Please fill in all fields.';
    status.className = 'form-status error';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    status.textContent = 'Please enter a valid email address.';
    status.className = 'form-status error';
    return;
  }

  await new Promise(r => setTimeout(r, 900));
  status.textContent = "Message sent! I'll get back to you soon 🎉";
  status.className = 'form-status success';
  e.target.reset();
  setTimeout(() => { status.className = 'form-status'; }, 6000);
});