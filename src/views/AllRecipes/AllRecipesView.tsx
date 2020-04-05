import * as React from 'react';
import { Button } from 'evergreen-ui';

import { AppLayout, Title } from '../../app/AppLayout';
import { RecipeTable } from './RecipeTable';
import { useOvermind } from '../../overmind';
import { useNavigation } from '../../navigation';

export const AllRecipesView: React.FC = () => {
  const { navigateToNewRecipe } = useNavigation();
  const { actions } = useOvermind();

  React.useEffect(() => {
    actions.recipes.fetchRecipes();
  }, [actions]);

  return (
    <AppLayout>
      <AppLayout.Header>
        <Title>Recipes</Title>
      </AppLayout.Header>
      <AppLayout.Content>
        <div className="flex flex-col h-full">
          <div className="flex mb-4 justify-end flex-initial">
            <Button
              appearance="primary"
              onClick={navigateToNewRecipe}
              iconBefore="add"
            >
              Add new recipe
            </Button>
          </div>

          <div className="flex-1 h-full">
            <RecipeTable />
          </div>
        </div>
      </AppLayout.Content>
    </AppLayout>
  );
};
