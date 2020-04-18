import { from } from 'fromfrom';
import type { History } from 'history';

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

  const response = await effects.recipes.api.fetchRecipes().run();

  response.caseOf({
    Left: (error) => {
      effects.errors.toast.showApiError('Failed to fetch recipes', error);
    },
    Right: (recipes) => {
      state.recipes.recipes = from(recipes).toObject((t) => t.id);
    },
  });

  state.recipes.isLoadingRecipes = false;
};

export const createNewRecipe: AsyncAction<
  {
    recipe: CreateRecipeDto;
    history: History;
  },
  Error | undefined
> = async ({ state, effects }, { recipe, history }) => {
  state.recipes.isSavingRecipe = true;

  const response = await effects.recipes.api.createNewRecipe(recipe).run();

  const isSuccess = response.caseOf({
    Left: (error) => {
      effects.errors.toast.showApiError('Failed to create new recipe', error);
      return error;
    },
    Right: (recipeId) => {
      effects.recipes.router.navigateToAllRecipes(history);
      return undefined;
    },
  });

  state.recipes.isSavingRecipe = false;
  return isSuccess;
};
