import { RecipeCategory, IngredientType, Ingredient } from './models';

export const ingredientTypes: IngredientType[] = [
  'vihannes',
  'neste',
  'mauste',
  'makkara',
  'yrtti',
].map((name, idx) => ({
  id: idx.toString(),
  name,
}));

export const recipeCategories: RecipeCategory[] = [
  [0, 'Starter'],
  [2, 'Pizzas'],
  [5, 'Soups'],
  [6, 'Salads'],
  [7, 'Sides'],
  [8, 'Desserts'],
  [9, 'Pastas'],
  [10, 'Steaks'],
  [11, 'Oven dishes'],
  [12, 'Stews'],
].map(([id, name]) => ({
  id: id.toString(),
  name: name.toString(),
}));

const findType = (name: string) => {
  const type = ingredientTypes.find((t) => t.name === name);
  if (!type) {
    throw new Error(`Ingredient type ${name} not found`);
  }

  return type.id;
};

// prettier-ignore
export const ingredients: Ingredient[] = [
  { name: 'peruna',          type: findType('vihannes') },
  { name: 'porkkana',        type: findType('vihannes') },
  { name: 'vesi',            type: findType('neste')    },
  { name: 'lihaliemikuutio', type: findType('mauste')   },
  { name: 'sipuli',          type: findType('vihannes') },
  { name: 'valkosipuli',     type: findType('vihannes') },
  { name: 'mustapippuri',    type: findType('mauste')   },
  { name: 'suola',           type: findType('mauste')   },
  { name: 'persilja',        type: findType('yrtti')    },
  { name: 'HK:n sininen',    type: findType('makkara')  },
].map((i, idx) => ({
  id: idx.toString(),
  ...i
}));
