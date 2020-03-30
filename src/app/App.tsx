import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

// import { AppLayout } from './AppLayout';
import { AllRecipesView } from '../views/AllRecipes';
import { AddNewRecipeView } from '../views/AddNewRecipe';
import { useOvermind } from '../overmind';

export const App: React.FC = () => {
  const { actions, effects } = useOvermind();

  React.useEffect(() => {
    effects.recipes.api.seed();

    actions.recipes.fetchRecipeCategories();
    actions.recipes.fetchIngredientTypes();
    actions.recipes.fetchIngredients();
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/recipes/new">
          <AddNewRecipeView />
        </Route>
        <Route path="/recipes">
          <AllRecipesView />
        </Route>
        <Route path="/">
          <Redirect to="/recipes" />
        </Route>
      </Switch>
    </Router>
  );
};
