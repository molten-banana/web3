let lastScrollY = window.scrollY;
let scrollVelocity = 0;
let smoothVelocity = 0;

/* =========================
   SMOOTH VELOCITY TRACKING
========================= */

function updateScrollVelocity() {
  const currentY = window.scrollY;

  scrollVelocity = currentY - lastScrollY;
  lastScrollY = currentY;
}

/* smoothing (inertia feel) */
function smooth() {
  smoothVelocity += (scrollVelocity - smoothVelocity) * 0.08;
}

/* expose globally for other scripts */
window.motion = {
  get velocity() {
    return smoothVelocity;
  }
};

window.addEventListener('scroll', updateScrollVelocity);

function loop() {
  smooth();
  requestAnimationFrame(loop);
}

loop();