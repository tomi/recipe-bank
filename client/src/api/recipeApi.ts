import { Recipe } from '../overmind';
import { CreateRecipeDto, Quantity } from '../overmind/recipes/models';

const API_URL = process.env.REACT_APP_API_URL ?? 'http://localhost:5000';

/**
 * Lists all recipes from the API
 */
export const listAllRecipes = async (): Promise<Recipe[]> => {
  const response = await fetch(`${API_URL}/recipe`);
  const data = await response.json();

  return data.map(deserializeRecipe) as Recipe[];
};

/**
 * Creates a new recipe using the API
 */
export const createNewRecipe = async (
  recipe: CreateRecipeDto,
): Promise<Recipe> => {
  const serializedRecipe = serializeRecipe(recipe);

  const response = await fetch(`${API_URL}/recipe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(serializedRecipe),
  });
  const data = await response.json();

  return deserializeRecipe(data) as Recipe;
};

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
} = {}): { quantity: Quantity } | {} => {
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
