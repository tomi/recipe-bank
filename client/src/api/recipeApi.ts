import { EitherAsync } from 'purify-ts/EitherAsync';

import { Recipe } from '../overmind';
import { CreateRecipeDto, Quantity } from '../overmind/recipes/models';
import { RequestError, fetch } from './api';

const API_URL = process.env.REACT_APP_API_URL ?? 'http://localhost:5000';

/**
 * Lists all recipes from the API
 */
export const listAllRecipes = () =>
  fetch<any>(`${API_URL}/recipe`).map(
    (response) => response.map(deserializeRecipe) as Recipe[],
  );

/**
 * Creates a new recipe using the API
 */
export const createNewRecipe = (recipe: CreateRecipeDto) =>
  EitherAsync<RequestError, Recipe>(async ({ fromPromise }) => {
    const serializedRecipe = serializeRecipe(recipe);

    const response = await fromPromise(
      fetch<any>(`${API_URL}/recipe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serializedRecipe),
      }).run(),
    );

    return deserializeRecipe(response) as Recipe;
  });

const serializeRecipe = (recipe: CreateRecipeDto) => ({
  ...recipe,
  ingredients: recipe.ingredients.map((i) => ({
    ...i,
    ...serializeQuantity(i.quantity),
  })),
});

const serializeQuantity = (quantity?: Quantity) => {
  if (quantity === undefined) {
    return undefined;
  }

  if (typeof quantity === 'number') {
    return {
      minQuantity: quantity,
    };
  }

  return {
    minQuantity: quantity.from,
    maxQuantity: quantity.to,
  };
};

const deserializeRecipe = (recipe: Recipe) => ({
  ...recipe,
  ingredients: recipe.ingredients.map((ingredient: any) => ({
    ...ingredient,
    ...deserializeQuantity(ingredient),
  })),
});

const deserializeQuantity = ({
  minQuantity,
  maxQuantity,
}: {
  minQuantity?: number;
  maxQuantity?: number;
} = {}): { quantity: Quantity } | Record<string, never> => {
  if (minQuantity && maxQuantity) {
    return {
      quantity: {
        from: minQuantity,
        to: maxQuantity,
      },
    };
  }

  if (minQuantity) {
    return { quantity: minQuantity };
  }

  return {};
};
