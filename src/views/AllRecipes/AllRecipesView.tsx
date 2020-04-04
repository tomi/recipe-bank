import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'evergreen-ui';

import { AppLayout, Title } from '../../app/AppLayout';
import { RecipeTable } from './RecipeTable';

export const AllRecipesView: React.FC = () => {
  const history = useHistory();

  return (
    <AppLayout>
      <AppLayout.Header>
        <Title>Recipes</Title>
      </AppLayout.Header>
      <AppLayout.Content>
        <div className="">
          <div className="flex mb-4 justify-end">
            <Button
              appearance="primary"
              onClick={() => history.push('/recipes/new')}
              iconBefore="add"
            >
              Add new recipe
            </Button>
          </div>

          <div>
            <RecipeTable />
          </div>
        </div>
      </AppLayout.Content>
    </AppLayout>
  );
};
