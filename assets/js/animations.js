const sections = document.querySelectorAll('.fade-section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.15
});

sections.forEach((section) => observer.observe(section));

/* =========================
   TIMELINE PROGRESS
========================= */

let timeline;
let progress;

function updateTimelineProgress() {
  if (!timeline || !progress) return;

  const rect = timeline.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // 🔥 tighten the active scroll zone so it doesn't start too early / end too late
  const start = windowHeight * 0.85;
  const end = -rect.height * 0.15;

  const percent = (start - rect.top) / (start - end);

  const clamped = Math.max(0, Math.min(percent, 1));

  progress.style.transform =
    `translateX(-50%) scaleY(${clamped})`;
}

/* =========================
   TIMELINE OBSERVER
========================= */

const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });

timelineItems.forEach((item) => timelineObserver.observe(item));

/* =========================
   ACTIVE CARDS
========================= */

const cards = document.querySelectorAll('.timeline-item');

function updateActiveCards() {
  const trigger = window.innerHeight * 0.65;

  cards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const inner = card.querySelector('.timeline-card');

    if (!inner) return;

    if (rect.top <= trigger) {
      inner.classList.add('active');
    } else {
      inner.classList.remove('active');
    }
  });
}

/* =========================
   PARALLAX
========================= */

const parallaxElements = document.querySelectorAll('.parallax-inner');

function updateParallax() {
  const velocity = window.motion?.velocity || 0;

  parallaxElements.forEach((element, index) => {
    const rect = element.getBoundingClientRect();

    const speed = 0.04 + index * 0.01;

    const offset = rect.top * speed + velocity * 0.15;

    element.style.transform = `translateY(${offset}px)`;
  });
}

/* =========================
   MAIN LOOP
========================= */

function loop() {
  updateTimelineProgress();
  updateActiveCards();
  updateParallax();

  requestAnimationFrame(loop);
}

/* INIT */
window.addEventListener('load', () => {
  timeline = document.querySelector('.timeline');
  progress = document.querySelector('.timeline-progress');

  progress.style.transform = 'translateX(-50%) scaleY(0)';

  loop();
});