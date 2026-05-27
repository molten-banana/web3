function clamp(value, min, max) {
  return value >= min
    ? (value <= max ? value : max)
    : min;
}

/* =========================
   DUST PARTICLE
========================= */

function Dust(
  startx,
  starty,
  offset = 0,
  baseColor = 1,
  duration = 100,
  size = 20
) {
  this.x = startx;
  this.y = starty;

  this.duration = duration;
  this.offset = offset;
  this.size = size;

  this.timer = offset % duration;
  this.baseColor = baseColor;

  this.draw = function(ctx) {
    if (this.timer > this.duration) {
      this.timer = 0;
    }

    this.timer += 1;

    const framesize = this.size;
    const positionMultiplier = this.timer * (this.offset % 2);

    const xPosition = this.x + positionMultiplier;
    const yPosition = this.y + positionMultiplier;

    const colorOpacity = clamp(
      (this.timer + 50) % this.duration,
      0,
      this.baseColor
    );

    ctx.beginPath();
    ctx.arc(xPosition, yPosition, framesize, 0, Math.PI * 2);

    ctx.fillStyle = `rgba(255,255,255,${colorOpacity})`;
    ctx.fill();
  };
}

/* =========================
   RETINA CANVAS SETUP (NEW)
========================= */

function setupCanvas(canvasElement, ctx) {
  const dpr = window.devicePixelRatio || 1;

  const width = window.innerWidth;
  const height = window.innerHeight;

  canvasElement.width = width * dpr;
  canvasElement.height = height * dpr;

  canvasElement.style.width = width + 'px';
  canvasElement.style.height = height + 'px';

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

/* =========================
   RENDER LOOP
========================= */

function renderFrame(ctx, canvasElement, dustArray) {
  ctx.clearRect(
    0,
    0,
    canvasElement.width,
    canvasElement.height
  );

  for (let i = 0; i < dustArray.length; i++) {
    dustArray[i].draw(ctx);
  }

  requestAnimationFrame(() => {
    renderFrame(ctx, canvasElement, dustArray);
  });
}

/* =========================
   INITIALIZE
========================= */

const canvasElements = document.querySelectorAll('canvas');

canvasElements.forEach((canvasElement) => {
  const ctx = canvasElement.getContext('2d');

  const quantity = parseInt(canvasElement.getAttribute('data-dust'));
  const ballsize = parseFloat(canvasElement.getAttribute('data-size'));
  const ballopacity = parseFloat(canvasElement.getAttribute('data-opacity'));

  const dustArray = [];

  for (let i = 0; i < quantity; i++) {
    const positionX =
      window.innerWidth * Math.random() * 1.5 -
      window.innerWidth / 4;

    const positionY =
      window.innerHeight * Math.random() * 1.5 -
      window.innerHeight / 4;

    const duration = Math.random() * 500 + 1000;
    const size = Math.random() * ballsize;
    const offset = Math.random() * 100;

    const baseColor = clamp(
      (Math.random() * ballopacity) / 100,
      0,
      0.3
    );

    dustArray.push(
      new Dust(
        positionX,
        positionY,
        offset,
        baseColor,
        duration,
        size
      )
    );
  }

  setupCanvas(canvasElement, ctx);
  renderFrame(ctx, canvasElement, dustArray);
});

/* =========================
   RESIZE FIX (RETINA SAFE)
========================= */

window.addEventListener('resize', () => {
  canvasElements.forEach((canvasElement) => {
    const ctx = canvasElement.getContext('2d');
    setupCanvas(canvasElement, ctx);
  });
});