export type IngredientTypeId = string;
export type IngredientId = string;
export type RecipeId = string;
export type RecipeIngredientId = string;
export type RecipeCategoryId = string;

export enum CookingDuration {
  LessThan15 = 'LessThan15',
  Between15And30 = 'Between15And30',
  Between30And60 = 'Between30And60',
  Between60to90 = 'Between60to90',
  Between90to120 = 'Between90to120',
  Between2to3hrs = 'Between2to3hrs',
  Between3to6hrs = 'Between3to6hrs',
  Between6to12hrs = 'Between6to12hrs',
  Between12to24hrs = 'Between12to24hrs',
  Over24hrs = 'Over24hrs',
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

export interface IngredientType {
  id: IngredientTypeId;
  name: string;
}

export interface Ingredient {
  id: IngredientId;
  name: string;
  type: IngredientTypeId;
  parentId?: IngredientId;
}

export interface RecipeIngredient {
  id: RecipeIngredientId;
  order: number;
  ingredientText: string;
  ingredientId?: IngredientId;
  quantity?: Quantity;
  modifier?: string;
  unit?: string;
}

export interface RecipeCategory {
  id: RecipeCategoryId;
  name: string;
}

export interface Recipe {
  id: RecipeId;
  name: string;
  duration: CookingDuration;
  numPortions: number;
  instructions: string;
  ingredients: RecipeIngredient[];
  tags: string[];
  categories: RecipeCategoryId[];
}

export interface CreateRecipeIngredientDto {
  ingredientText: string;
  ingredientId?: IngredientId;
  quantity?: Quantity;
  modifier?: string;
  unit?: string;
}

export interface CreateRecipeDto {
  name: string;
  duration: CookingDuration;
  numPortions: number;
  instructions: string;
  ingredients: CreateRecipeIngredientDto[];
  tags: string[];
  categories: RecipeCategoryId[];
}
