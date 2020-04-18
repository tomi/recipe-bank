import { from } from 'fromfrom';
import { derived } from 'overmind';
import { IngredientType, Ingredient, Recipe, RecipeCategory } from './models';

type EntityContainer<TEntity> = {
  [id: string]: TEntity;
};

type IngredientTypes = EntityContainer<IngredientType>;
type Ingredients = EntityContainer<Ingredient>;
type Recipes = EntityContainer<Recipe>;
type RecipeCategories = EntityContainer<RecipeCategory>;

type State = {
  ingredientTypes: IngredientTypes;
  ingredients: Ingredients;
  ingredientsList: Ingredient[];
  recipes: Recipes;
  recipeList: Recipe[];
  recipeCategories: RecipeCategories;
  recipeCategoryList: RecipeCategory[];
  isLoadingRecipes: boolean;
  isSavingRecipe: boolean;
};

export const state: State = {
  ingredientTypes: {},
  ingredients: {},
  recipes: {},
  recipeCategories: {},
  ingredientsList: derived<State, Ingredient[]>((state) =>
    Object.values(state.ingredients),
  ),
  recipeList: derived<State, Recipe[]>((state) => Object.values(state.recipes)),
  recipeCategoryList: derived<State, RecipeCategory[]>((state) =>
    from(state.recipeCategories)
      .map((pair) => pair[1])
      .sortBy((x) => x.name)
      .toArray(),
  ),
  isLoadingRecipes: false,
  isSavingRecipe: false,
};
