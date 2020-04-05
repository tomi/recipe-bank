import { useHistory } from 'react-router-dom';
import { RecipeId } from './overmind';

export function useNavigation() {
  const history = useHistory();

  const navigateToAllRecipes = () => history.push('/recipes');
  const navigateToNewRecipe = () => history.push('/recipes/new');
  const navigateToRecipe = (id: RecipeId) => history.push(`/recipes/${id}`);

  return {
    navigateToAllRecipes,
    navigateToNewRecipe,
    navigateToRecipe,
  };
}
