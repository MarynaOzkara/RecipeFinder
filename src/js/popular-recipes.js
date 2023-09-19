import { getRecipes } from './recipe-api';
import { openModalOnClick } from './modal-backdrope';

const popularRecepies = document.querySelector('.js-popular-recepies');

getRecipes()
  .then(data => {
    popularRecepies.innerHTML = createMarkupPopularRecepies(data);

    popularRecepies.addEventListener('click', onRecipeClick);

    console.log(data);
  })
  .catch(err => {
    console.log(err);
  });

// Функція відмалювання популярних рецептів за данних отриманних з беку
function createMarkupPopularRecepies(arr) {
  return arr
    .map(
      ({ preview, title, description, _id }) => `
        <li class="popular-recepies-item" data-id="${_id}">
            <div class="thomb-popular-wrap">
              <div class="thomb-popular-img">
                <img src="${preview}" alt="${title}">
              </div>
              <div class="thomb-popular-info">
                <h3 class="thomb-popular-title points-title">${title}</h3>
                <p class="popular-recepie-descr points-desc">${description}</p>
              </div>
            </div>
        </li>
         
    `
    )
    .join('');
}
// Вішаемо слухач подій на список популярних рецептів
function onRecipeClick(evt) {
  const recipeId = evt.target.closest('.popular-recepies-item').dataset.id;
  console.log(recipeId);
  openModalOnClick(recipeId);
}
