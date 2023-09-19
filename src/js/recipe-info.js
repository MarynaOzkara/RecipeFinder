import { getRecipeById } from './recipe-api';

export function handleRecipeInfo(recipeId) {
  console.log('Hello!');
  getRecipeById(recipeId)
    .then(data => console.log(data))
    .catch(err => {
      console.log(err);
    });
}
