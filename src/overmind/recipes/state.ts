import { from } from 'fromfrom';
import { derived } from 'overmind';
import {
  IIngredientType,
  IIngredient,
  IRecipe,
  IRecipeCategory,
} from './models';

type EntityContainer<TEntity> = {
  [id: string]: TEntity;
};

type IngredientTypes = EntityContainer<IIngredientType>;
type Ingredients = EntityContainer<IIngredient>;
type Recipes = EntityContainer<IRecipe>;
type RecipeCategories = EntityContainer<IRecipeCategory>;

type State = {
  ingredientTypes: IngredientTypes;
  ingredients: Ingredients;
  ingredientsList: IIngredient[];
  recipes: Recipes;
  recipeList: IRecipe[];
  recipeCategories: RecipeCategories;
  recipeCategoryList: IRecipeCategory[];
};

export const state: State = {
  ingredientTypes: {},
  ingredients: {},
  recipes: {},
  recipeCategories: {},
  ingredientsList: derived<State, IIngredient[]>((state) =>
    Object.values(state.ingredients),
  ),
  recipeList: derived<State, IRecipe[]>((state) =>
    Object.values(state.recipes),
  ),
  recipeCategoryList: derived<State, IRecipeCategory[]>((state) =>
    from(state.recipeCategories)
      .map((pair) => pair[1])
      .sortBy((x) => x.name)
      .toArray(),
  ),
};
