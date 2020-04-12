import * as React from 'react';
import { Table, Spinner } from 'evergreen-ui';

import { Recipe, useOvermind } from '../../overmind';
import { formatDuration } from '../../ui/formatters';
import { RecipeCategories } from '../../components/RecipeCategories';
import { useNavigation } from '../../navigation';

export interface RecipeTableProps {}

export const RecipeTable: React.FC<RecipeTableProps> = () => {
  const { state } = useOvermind();
  const { navigateToRecipe } = useNavigation();

  return (
    <Table height="100%">
      <Table.Head>
        <Table.TextHeaderCell>Name</Table.TextHeaderCell>
        <Table.TextHeaderCell flexBasis={100} flexShrink={1} flexGrow={0}>
          Duration
        </Table.TextHeaderCell>
        <Table.TextHeaderCell>Tags</Table.TextHeaderCell>
      </Table.Head>
      <Table.Body>
        {state.recipes.isLoadingRecipes ? (
          <Spinner marginX="auto" marginY={120} delay={300} />
        ) : (
          state.recipes.recipeList.map((r: Recipe) => (
            <Table.Row
              key={r.id}
              isSelectable
              onSelect={() => navigateToRecipe(r.id)}
            >
              <Table.TextCell>{r.name}</Table.TextCell>
              <Table.TextCell flexBasis={100} flexShrink={1} flexGrow={0}>
                {formatDuration(r.duration)}
              </Table.TextCell>
              <Table.Cell>
                <RecipeCategories categoryIds={r.categories} />
              </Table.Cell>
            </Table.Row>
          ))
        )}
      </Table.Body>
    </Table>
  );
};
