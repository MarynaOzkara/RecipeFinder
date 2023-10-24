import { getRecipeById } from './recipe-api';
import { handleStars } from './rating-stars';
import { ratedStars } from './rating-stars';
const recipeInfoContent = document.querySelector('.modal-content');
const FAVORITES_RECIPES = [];
export function handleRecipeInfo(recipeId) {
  getRecipeById(recipeId)
    .then(recipe => {
      const {
        title,
        description,
        preview,
        rating,
        time,
        youtube,
        ingredients: { desc, id, measure, name },
        tags,
        _id,
      } = recipe;
      // console.log(recipe._id);
      createRecipeInfoById(recipe);
      const ingredientsList = document.querySelector(
        '.recepi-ingredients-list'
      );
      const tagsList = document.querySelector('.recepi-tags-list');
      ingredientsList.innerHTML = createIngredientsMarkup(recipe.ingredients);
      if (recipe.tags.length > 1) {
        tagsList.innerHTML = createTagsMarkup(recipe.tags);
      }

      handleStars();
      const ratedValue = Math.round(recipe.rating);
      const stars = document.querySelectorAll('.star-item');
      // console.log(stars);
      stars.innerHTML = ratedStars(ratedValue);
      const addToFavoriteBtn = document.querySelector('.add-favorit');
      addToFavoriteBtn.addEventListener('click', e => {
        e.preventDefault();
        // console.log(e.target.dataset.id);
        const idRecipe = e.target.dataset.id;

        FAVORITES_RECIPES.push(idRecipe);
        console.log(FAVORITES_RECIPES);
        localStorage.setItem(
          'FavoriteRecipe',
          JSON.stringify(FAVORITES_RECIPES)
        );
        // console.log(idRecipe);
      });
    })
    .catch(err => {
      console.log(err);
    });
}
// Функція відмальовки списку ингридіентів
function createIngredientsMarkup(arr) {
  return arr
    .map(
      ({ name, measure }) => `
  <li class="recepi-ingredients-item">
    <p class="ingredient-name">${name}</p>
    <p class="ingredient-mesure">${measure}</p>
  </li>
  `
    )
    .join('');
}
// Функція відмальовки списку тегів

function createTagsMarkup(arr) {
  return arr
    .map(
      tag => `
      <li class="recepi-tags-item">
        <button type="button" class="recepi-tags-btn">#${tag}</button>
      </li>
  `
    )
    .join('');
}

// Функція відмальовки модального вікна обриного рецепту
function createRecipeInfoById({
  title,
  preview,
  instructions,
  rating,
  time,
  youtube,
  ingredients: { desc, id, measure, name },
  tags,
  _id,
}) {
  recipeInfoContent.innerHTML = `
              <div class="video-oder">
                  <h2 class="modal-recepi-title">${title}</h2>
                  <div class="recipe-video-content">
                      <a href="${youtube}" class="youtube-link" target="_blank">
                          <div class="recepi-video-wrap">
                              <img src="${preview}" alt="${title}">
                          </div>
                          <div class="youtube-btn">
                              <svg class="youtube-icon" width="32" height="32">
                                  <use href="/src/images/icons.svg#youtube-icon"></use>
                              </svg>
                          </div>
                      </a>
                  </div>
              </div>
              <div class="recipe-info-order">
                  <div class="recepi-rating">
                      <p class="recepi-rating-value">${rating.toFixed(1)}</p>
                      <ul class="js-rating-items list">      
                      </ul>
                      <p class="recepi-time-cook">${time} min</p>
                  </div>
                      <ul class="recepi-ingredients-list list">
                      </ul>
                  <div class="recepi-tags-list">
                      <ul class="recepi-tags-list list">
                      </ul>
                  </div>
              </div>
              <p class="modal-recepi-description">${instructions}</p>
              <div class="modal-recepi-buttons">
                    <button type="button" class="add-favorit" data-id="${_id}">Add to favorite</button>
                    <button type="button" class="give-rating">Give rating</button>
                </div>
  `;
}

/* <div class="video-oder">
                  <h2 class="modal-recepi-title">${title}</h2>
                  <div class="recipe-video-content">
                      <a href="${youtube}" class="youtube-link" target="_blank">
                          <div class="recepi-video-wrap">
                              <img src="${preview}" alt="${title}">
                          </div>
                          <div class="youtube-btn">
                              <svg class="youtube-icon" width="32" height="32">
                                  <use href="/src/images/icons.svg#youtube-icon"></use>
                              </svg>
                          </div>
                      </a>
                  </div>
              </div>
              <div class="recipe-info-order">
                  <div class="recepi-rating">
                      <p class="recepi-rating-value">${rating}</p>
                      <div class="recepi-rating-body">
                          <div class="rating-active">
                              <div class="rating-items">
                                  <input type="radio" class="rating-stars-item" value="1" name="rating">
                                  <input type="radio" class="rating-stars-item" value="2" name="rating">
                                  <input type="radio" class="rating-stars-item" value="3" name="rating">
                                  <input type="radio" class="rating-stars-item" value="4" name="rating">
                                  <input type="radio" class="rating-stars-item" value="5" name="rating">
                              </div>
                          </div>
                      </div>
                      <p class="recepi-time-cook">${time} min</p>
                  </div>
                  <ul class="recepi-ingredients-list list">
                  </ul>
                  <div class="recepi-tags-wrap">
                      <ul class="recepi-tags-list list">
                      </ul>
                  </div>
              </div>
              <p class="modal-recepi-description">${instructions}</p> */
