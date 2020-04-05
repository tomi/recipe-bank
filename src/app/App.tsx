import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { useOvermind } from '../overmind';
import { AllRecipesView } from '../views/AllRecipes';
import { AddNewRecipeView } from '../views/AddNewRecipe';
import { SingleRecipeView } from '../views/SingleRecipe';

export const App: React.FC = () => {
  const { actions, effects } = useOvermind();

  React.useEffect(() => {
    effects.recipes.api.seed();

    actions.recipes.fetchRecipeCategories();
    actions.recipes.fetchIngredientTypes();
    actions.recipes.fetchIngredients();
  }, [actions, effects]);

  return (
    <Router>
      <Switch>
        <Route path="/recipes/new">
          <AddNewRecipeView />
        </Route>

        <Route path="/recipes" exact component={AllRecipesView} />
        <Route path="/recipes/" exact component={AllRecipesView} />
        <Route path="/recipes/:recipeId" component={SingleRecipeView} />

        <Route path="/">
          <Redirect to="/recipes" />
        </Route>
      </Switch>
    </Router>
  );
};
