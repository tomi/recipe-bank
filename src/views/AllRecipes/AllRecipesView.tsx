import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'evergreen-ui';

import { AppLayout, Title } from '../../app/AppLayout';
import { RecipeTable } from './RecipeTable';
import { useOvermind } from '../../overmind';

export const AllRecipesView: React.FC = () => {
  const history = useHistory();
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
              onClick={() => history.push('/recipes/new')}
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
