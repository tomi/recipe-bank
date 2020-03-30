import { ingredientTypes, recipeCategories, ingredients } from './seeds';
import { IIngredientType, IRecipeCategory, IIngredient } from './models';
import { from } from 'fromfrom';

enum LocalStorageKey {
  RecipeCategories = 'recipeCategories',
  IngredientTypes = 'ingredientTypes',
  Ingredients = 'ingredients',
}

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
    const values = deserializeFromLocalStorage<IRecipeCategory[]>(
      LocalStorageKey.RecipeCategories,
    );

    return values ?? [];
  },

  async fetchIngredientTypes() {
    const values = deserializeFromLocalStorage<IIngredientType[]>(
      LocalStorageKey.IngredientTypes,
    );

    return values ?? [];
  },

  async fetchIngredients() {
    const values = deserializeFromLocalStorage<IIngredient[]>(
      LocalStorageKey.Ingredients,
    );

    return values ?? [];
  },

  async createIngredientType(ingredientType: Omit<IIngredientType, 'id'>) {
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
};

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
