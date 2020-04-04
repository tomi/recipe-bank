import * as React from 'react';
import { Table } from 'evergreen-ui';

import { useOvermind, Recipe } from '../../overmind';
import { formatDuration } from '../../ui/formatters';
import { RecipeCategories } from '../../components/RecipeCategories';

export interface RecipeTableProps {}

export const RecipeTable: React.FC<RecipeTableProps> = () => {
  const { state } = useOvermind();

  return (
    <Table>
      <Table.Head>
        <Table.TextHeaderCell>Name</Table.TextHeaderCell>
        <Table.TextHeaderCell>Duration</Table.TextHeaderCell>
        <Table.TextHeaderCell>Tags</Table.TextHeaderCell>
      </Table.Head>
      <Table.Body height={240}>
        {state.recipes.recipeList.map((r: Recipe) => (
          <Table.Row
            key={r.id}
            isSelectable
            // onSelect={() => console.log(r.name)}
          >
            <Table.TextCell>{r.name}</Table.TextCell>
            <Table.TextCell>{formatDuration(r.duration)}</Table.TextCell>
            <Table.Cell>
              <RecipeCategories categoryIds={r.categories} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
