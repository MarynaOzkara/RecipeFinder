import { handleRecipeInfo } from './recipe-info';

const modalBacdrope = document.querySelector('.js-modal');
const closeBtn = document.querySelector('.modal-close-btn');
const body = document.body;

export function openModalOnClick(recipeId) {
  modalBacdrope.classList.add('is-active');

  handleRecipeInfo(recipeId);
  body.classList.add('no-scroll');
  closeBtn.addEventListener('click', closeModal);
}
// Функція закриття модалки
function closeModal() {
  modalBacdrope.classList.remove('is-active');
  body.classList.remove('no-scroll');
}
//   Закриття модалки по кнопкі Escape
window.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeModal();
  }
});
// Закриття модалки по кліку на область за модалкою
window.addEventListener('click', event => {
  if (
    event.target.classList.contains('modal-close-btn') ||
    event.target.classList.contains('modal-bg')
  ) {
    closeModal(event.target.elements);
  }
});
