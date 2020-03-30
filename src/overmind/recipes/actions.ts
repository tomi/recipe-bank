import { from } from 'fromfrom';
import { AsyncAction } from '../';

export const fetchRecipeCategories: AsyncAction = async ({
  effects,
  state,
}) => {
  const categories = await effects.recipes.api.fetchRecipeCategories();

  state.recipes.recipeCategories = from(categories).toObject((c) => c.id);
};

export const fetchIngredientTypes: AsyncAction = async ({ effects, state }) => {
  const types = await effects.recipes.api.fetchIngredientTypes();

  state.recipes.ingredientTypes = from(types).toObject((t) => t.id);
};

export const fetchIngredients: AsyncAction = async ({ effects, state }) => {
  const ingredients = await effects.recipes.api.fetchIngredients();

  state.recipes.ingredients = from(ingredients).toObject((t) => t.id);
};
