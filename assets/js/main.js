/* =========================
   MAGNETIC BUTTONS
========================= */

const magneticButtons = document.querySelectorAll('.glass-button');

magneticButtons.forEach((button) => {

  button.addEventListener('mousemove', (e) => {

    const rect = button.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    button.style.transform =
      `translate(${x * 0.18}px, ${y * 0.18}px)`;

  });

  button.addEventListener('mouseleave', () => {
    button.style.transform = 'translate(0px, 0px)';
  });

});

/* =========================
   PROJECT MODAL (NEW FEATURE)
========================= */

const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const closeModal = document.getElementById('close-modal');

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach((card) => {

  card.addEventListener('click', () => {

    modalTitle.textContent = card.dataset.title;
    modalDesc.textContent = card.dataset.desc;

    modal.classList.remove('hidden');

  });

});

closeModal.addEventListener('click', () => {
  modal.classList.add('hidden');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});