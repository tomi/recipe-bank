export type IngredientTypeId = string;
export type IngredientId = string;
export type RecipeId = string;
export type RecipeIngredientId = string;
export type RecipeCategoryId = string;

export enum CookingDuration {
  LessThan15 = 'lessThan15',
  Between15And30 = 'between15and30',
  Between30And60 = 'between30and60',
  Between60to90 = 'between60to90',
  Between90to120 = 'between90to120',
  Between2to3hrs = 'between2to3hrs',
  Between3to6hrs = 'between3to6hrs',
  Between6to12hrs = 'between6to12hrs',
  Between12to24hrs = 'between12to24hrs',
  Over24hrs = 'over24hrs',
}

export enum Unit {
  liter = 'l',
  kilo = 'kg',
  piece = 'pc',
  package = 'pkg',
}

export type QuantityRange = {
  from: number;
  to: number;
};

export type Quantity = number | QuantityRange;

export interface IIngredientType {
  id: IngredientTypeId;
  name: string;
}

export interface IIngredient {
  id: IngredientId;
  name: string;
  type: IngredientTypeId;
  parentId?: IngredientId;
}

export interface IRecipeIngredient {
  id: RecipeIngredientId;
  order: number;
  ingredientId: IngredientId;
  quantity: Quantity;
  modifier: string;
  unit: string;
}

export interface IRecipeCategory {
  id: RecipeCategoryId;
  name: string;
}

export interface IRecipe {
  id: RecipeId;
  name: string;
  duration: CookingDuration;
  numPortions: number;
  instructions: string;
  ingredients: IRecipeIngredient[];
  tags: string[];
  categories: IRecipeCategory[];
}
