import {
  IConfig,
  IOnInitialize,
  IAction,
  IOperator,
  IDerive,
  IState,
} from 'overmind';
import { createHook } from 'overmind-react';
import { namespaced } from 'overmind/config';

import * as errors from './errors';
import * as recipes from './recipes';

export const config = namespaced({
  errors,
  recipes,
});

export interface Config extends IConfig<typeof config> {}

export interface OnInitialize extends IOnInitialize<Config> {}

export interface Action<Input = void, Output = void>
  extends IAction<Config, Input, Output> {}

export interface AsyncAction<Input = void, Output = void>
  extends IAction<Config, Input, Promise<Output>> {}

export interface Operator<Input = void, Output = Input>
  extends IOperator<Config, Input, Output> {}

export interface Derive<Parent extends IState, Output>
  extends IDerive<Config, Parent, Output> {}

export const useOvermind = createHook<typeof config>();

export type {
  Ingredient,
  IngredientType,
  Recipe,
  RecipeIngredient,
  IngredientId,
  IngredientTypeId,
  RecipeId,
  RecipeIngredientId,
} from './recipes/models';
