import { from } from 'fromfrom';
import { AsyncAction } from '..';
import { CreateRecipeDto } from './models';

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

export const fetchRecipes: AsyncAction = async ({ effects, state }) => {
  state.recipes.isLoadingRecipes = true;

  try {
    const recipes = await effects.recipes.api.fetchRecipes();

    state.recipes.recipes = from(recipes).toObject((t) => t.id);
  } finally {
    state.recipes.isLoadingRecipes = false;
  }
};

export const createNewRecipe: AsyncAction<CreateRecipeDto> = async (
  { effects },
  recipe,
) => {
  await effects.recipes.api.createNewRecipe(recipe);
};
