import axios from 'axios';
import Notiflix from 'notiflix';

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';

// Функція отримання популярних рецептів з бекенду
export async function getRecipes() {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/popular`);
    // console.log(response);
    return response.data;
  } catch (error) {
    Notiflix.Notify.failure(
      'Sorry, something went wrong. Plise try again later.'
    );
    console.log(error);
    throw error;
  }
}
export async function getRecipeById(id) {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    Notiflix.Notify.failure(
      'Sorry, we did not find this recipe. Please try another one.'
    );
    throw error;
  }
}
