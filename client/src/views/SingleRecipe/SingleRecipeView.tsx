/* eslint-disable jsx-a11y/anchor-has-content */
import * as React from 'react';
import { useParams } from 'react-router-dom';
import {
  IconButton,
  Spinner,
  Heading,
  Pane,
  Text,
  Paragraph,
  Link,
  ArrowLeftIcon,
  ArrowRightIcon,
} from 'evergreen-ui';

import './SingleRecipeView.css';
import { AppLayout } from '../../app/AppLayout';
import { useOvermind, Recipe, RecipeIngredient } from '../../overmind';
import { NoRecipeFound } from './NoRecipeFound';
import { useNavigation } from '../../navigation';
import { formatQuantity, formatDuration } from '../../ui/formatters';
import { speechAvailable, speakText, stopSpeaking } from './speechSynth';

export interface SingleRecipeViewProps {}

export const SingleRecipeView: React.FC<SingleRecipeViewProps> = () => {
  const [isSpeaking, setIsSpeaking] = React.useState(false);
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

  const speakIngredients = () => {
    setIsSpeaking(!isSpeaking);

    if (isSpeaking) {
      stopSpeaking();
      return;
    }

    const ingredientsText = recipe.ingredients
      .map(
        (i) =>
          `${formatQuantity(i.quantity)} ${i.unit ?? ''} ${i.ingredientText}`,
      )
      .join('. ');

    speakText(ingredientsText, 'fi-FI', () => setIsSpeaking(false));
  };

  const speakInstructions = () => {
    setIsSpeaking(!isSpeaking);

    if (isSpeaking) {
      stopSpeaking();
      return;
    }

    speakText(recipe.instructions, 'fi-FI', () => setIsSpeaking(false));
  };

  return (
    <AppLayout>
      <AppLayout.Header>
        <IconButton icon="arrow-left" onClick={navigateToAllRecipes} />
      </AppLayout.Header>
      <AppLayout.Content>
        <Heading size={700} className="pl-4">
          {recipe.name}
        </Heading>
        {recipe.originalUrl && (
          <div className="pl-4 pt-2">
            <Link href={recipe.originalUrl} rel="noopener noreferrer">
              {recipe.originalUrl}
            </Link>
          </div>
        )}
        <div className="sm:overflow-hidden">
          <div className="mt-4 flex flex-row recipe-slider">
            <Pane
              flexDirection="column"
              className="recipe-slider-pane"
              id="ingredients"
            >
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <Heading size={600}>Ingredients</Heading>
                  <Text size={300} className="mt-2">
                    {recipe.numPortions} portions
                  </Text>
                </div>
                {speechAvailable && (
                  <IconButton
                    onClick={speakIngredients}
                    icon={isSpeaking ? 'stop' : 'play'}
                  />
                )}
              </div>
              <Ingredients recipe={recipe} />
              <div className="sm:hidden mt-8 mr-1 float-right">
                <a href="#instructions">
                  <ArrowRightIcon size={20} />
                </a>
              </div>
            </Pane>
            <Pane className="recipe-slider-pane sm:flex-1" id="instructions">
              <div className="flex justify-between">
                <div>
                  <Heading size={600}>Instructions</Heading>
                  <Text size={300} className="mt-2">
                    {formatDuration(recipe.duration)}
                  </Text>
                </div>
                {speechAvailable && (
                  <IconButton
                    onClick={speakInstructions}
                    icon={isSpeaking ? 'stop' : 'play'}
                  />
                )}
              </div>
              <Instructions recipe={recipe} />
              <div className="sm:hidden mt-8 float-left">
                <a href="#ingredients">
                  <ArrowLeftIcon size={20} />
                </a>
              </div>
            </Pane>
          </div>
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
