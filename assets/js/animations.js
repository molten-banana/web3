const sections =
  document.querySelectorAll('.fade-section');

const observer =
  new IntersectionObserver((entries) => {

    entries.forEach((entry, index) => {

      if (entry.isIntersecting) {

        setTimeout(() => {

          entry.target.classList.add('show');

        }, index * 120);

      }

    });

  }, {
    threshold: 0.15
  });

sections.forEach((section) => {

  observer.observe(section);

});

/* =========================
   TIMELINE PROGRESS
========================= */

const timeline =
  document.querySelector('.timeline');

const progress =
  document.querySelector('.timeline-progress');

function updateTimelineProgress() {

  if (!timeline || !progress) return;

  const rect =
    timeline.getBoundingClientRect();

  const viewportHeight =
    window.innerHeight;

  const timelineHeight =
    rect.height;

  const start =
    viewportHeight * 0.6;

  const end =
    timelineHeight;

  const distanceScrolled =
    start - rect.top;

  const percent =
    Math.max(
      0,
      Math.min(
        distanceScrolled / end,
        1
      )
    );

  progress.style.height =
    `${percent * 100}%`;

}

window.addEventListener(
  'scroll',
  updateTimelineProgress
);

window.addEventListener(
  'load',
  updateTimelineProgress
);

/* TIMELINE STAGGER */

const timelineItems =
  document.querySelectorAll('.timeline-item');

timelineItems.forEach((item, index) => {

  const itemObserver =
    new IntersectionObserver((entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          setTimeout(() => {

            entry.target.classList.add('show');

          }, index * 180);

        }

      });

    }, {
      threshold: 0.2
    });

  itemObserver.observe(item);

});

/* =========================
   ACTIVE TIMELINE CARDS
========================= */

const cards =
  document.querySelectorAll('.timeline-item');

function updateActiveCards() {

  const triggerLine =
    window.innerHeight * 0.6;

  cards.forEach((card) => {

    const rect =
      card.getBoundingClientRect();

    if (rect.top <= triggerLine) {

      card
        .querySelector('.timeline-card')
        .classList.add('active');

    }

  });

}

window.addEventListener(
  'scroll',
  updateActiveCards
);

window.addEventListener(
  'load',
  updateActiveCards
);

/* =========================
   PARALLAX INNER
========================= */

const parallaxElements =
  document.querySelectorAll(
    '.parallax-inner'
  );

function updateParallax() {

  parallaxElements.forEach((element, index) => {

    const rect =
      element.getBoundingClientRect();

    const speed =
      0.04 + (index * 0.01);

    const offset =
      rect.top * speed;

    element.style.transform =
      `translateY(${offset}px)`;

  });

}

window.addEventListener(
  'scroll',
  updateParallax
);

window.addEventListener(
  'load',
  updateParallax
);