import { from } from 'fromfrom';
import type { History } from 'history';

import { ingredientTypes, recipeCategories, ingredients } from './seeds';
import {
  IngredientType,
  RecipeCategory,
  Ingredient,
  CreateRecipeDto,
} from './models';
import { listAllRecipes, createNewRecipe } from '../../api/recipeApi';

enum LocalStorageKey {
  RecipeCategories = 'recipeCategories',
  IngredientTypes = 'ingredientTypes',
  Ingredients = 'ingredients',
  Recipes = 'recipes',
}

const getNextId = (items: { id: string }[]) =>
  (
    from(items)
      .map((item) => parseInt(item.id, 10))
      .reduce(Math.max, 0) + 1
  ).toString();

const deserializeFromLocalStorage = <T>(key: string): T | null => {
  const value = window.localStorage.getItem(key);

  return value ? JSON.parse(value) : null;
};

const serializeToLocalStorage = (key: string, value: any) => {
  const serialized = JSON.stringify(value);

  window.localStorage.setItem(key, serialized);
};

export const api = {
  async seed() {
    const seedIfNotSeeded = (key: LocalStorageKey, seedValues: any) => {
      const existing = deserializeFromLocalStorage(key);
      if (!existing) {
        serializeToLocalStorage(key, seedValues);
      }
    };

    seedIfNotSeeded(LocalStorageKey.IngredientTypes, ingredientTypes);
    seedIfNotSeeded(LocalStorageKey.RecipeCategories, recipeCategories);
    seedIfNotSeeded(LocalStorageKey.Ingredients, ingredients);
  },

  async fetchRecipeCategories() {
    const values = deserializeFromLocalStorage<RecipeCategory[]>(
      LocalStorageKey.RecipeCategories,
    );

    return values ?? [];
  },

  async fetchIngredientTypes() {
    const values = deserializeFromLocalStorage<IngredientType[]>(
      LocalStorageKey.IngredientTypes,
    );

    return values ?? [];
  },

  async fetchIngredients() {
    const values = deserializeFromLocalStorage<Ingredient[]>(
      LocalStorageKey.Ingredients,
    );

    return values ?? [];
  },

  fetchRecipes() {
    return listAllRecipes();
  },

  async createIngredientType(ingredientType: Omit<IngredientType, 'id'>) {
    const existing = await this.fetchIngredientTypes();

    const newIngredientType = {
      id: getNextId(existing),
      ...ingredientType,
    };

    serializeToLocalStorage(LocalStorageKey.IngredientTypes, [
      ...existing,
      newIngredientType,
    ]);
  },

  createNewRecipe(recipe: CreateRecipeDto) {
    return createNewRecipe(recipe).map((recipe) => recipe.id);
  },
};

export const router = {
  navigateToAllRecipes(history: History) {
    this.navigateToUrl(history, '/recipes');
  },

  navigateToUrl(history: History, url: string) {
    history.push(url);
  },
};
