import * as React from 'react';
import { useParams } from 'react-router-dom';
import {
  IconButton,
  Spinner,
  Heading,
  Pane,
  Text,
  Paragraph,
} from 'evergreen-ui';

import { AppLayout } from '../../app/AppLayout';
import { useOvermind, Recipe, RecipeIngredient } from '../../overmind';
import { NoRecipeFound } from './NoRecipeFound';
import { useNavigation } from '../../navigation';
import { formatQuantity, formatDuration } from '../../ui/formatters';

export interface SingleRecipeViewProps {}

export const SingleRecipeView: React.FC<SingleRecipeViewProps> = () => {
  const { recipeId } = useParams();
  const { actions, state } = useOvermind();
  const { navigateToAllRecipes } = useNavigation();

  React.useEffect(() => {
    // We should actually fetch just the single recipe, not all
    actions.recipes.fetchRecipes();
  }, [actions]);

  if (state.recipes.isLoadingRecipes) {
    return (
      <AppLayout>
        <AppLayout.Header>
          <IconButton icon="arrow-left" onClick={navigateToAllRecipes} />
        </AppLayout.Header>
        <AppLayout.Content>
          <Spinner marginX="auto" marginY={120} />
        </AppLayout.Content>
      </AppLayout>
    );
  }

  const recipe = state.recipes.recipes[recipeId!];

  if (!recipe) {
    return <NoRecipeFound />;
  }

  return (
    <AppLayout>
      <AppLayout.Header>
        <IconButton icon="arrow-left" onClick={navigateToAllRecipes} />
      </AppLayout.Header>
      <AppLayout.Content>
        <Heading size={700} className="pl-4">
          {recipe.name}
        </Heading>
        <div className="mt-4 flex flex-row">
          <Pane display="flex" flexDirection="column" className="p-4">
            <Heading size={600}>Ingredients</Heading>
            <Text size={300} className="mt-2">
              {recipe.numPortions} portions
            </Text>
            <Ingredients recipe={recipe} />
          </Pane>
          <Pane className="p-4">
            <Heading size={600}>Instructions</Heading>
            <Text size={300} className="mt-2">
              {formatDuration(recipe.duration)}
            </Text>
            <Instructions recipe={recipe} />
          </Pane>
        </div>
      </AppLayout.Content>
    </AppLayout>
  );
};

export interface IngredientsProps {
  recipe: Recipe;
}

export const Ingredients: React.FC<IngredientsProps> = ({ recipe }) => {
  useOvermind();

  return (
    <ol className="mt-4">
      {recipe.ingredients.map((i) => (
        <Ingredient ingredient={i} />
      ))}
    </ol>
  );
};

export interface IngredientProps {
  ingredient: RecipeIngredient;
}

export const Ingredient: React.FC<IngredientProps> = ({ ingredient }) => {
  useOvermind();

  return (
    <li key={ingredient.order} className="border-b-2 py-2 flex">
      <Text width={100}>
        {formatQuantity(ingredient.quantity, true)} {ingredient.unit ?? ''}
      </Text>
      <Text className="flex-1">{ingredient.ingredientText}</Text>
    </li>
  );
};

export interface InstructionsProps {
  recipe: Recipe;
}

export const Instructions: React.FC<InstructionsProps> = ({ recipe }) => {
  useOvermind();

  return (
    <ol className="mt-4">
      {recipe.instructions.split('\n').map((line, idx) => (
        <li key={line} className="mb-4">
          <Paragraph size={500}>
            {idx + 1}. &nbsp;&nbsp;&nbsp;{line}
          </Paragraph>
        </li>
      ))}
    </ol>
  );
};
