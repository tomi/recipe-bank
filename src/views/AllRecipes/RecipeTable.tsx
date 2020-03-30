import * as React from 'react';
import { Table } from 'evergreen-ui';
import { useOvermind } from '../../overmind';
import { formatDuration } from '../../ui/formatters';

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
        {state.recipes.recipeList.map((r) => (
          <Table.Row key={r.id} isSelectable onSelect={() => alert(r.name)}>
            <Table.TextCell>{r.name}</Table.TextCell>
            <Table.TextCell>{formatDuration(r.duration)}</Table.TextCell>
            <Table.TextCell isNumber></Table.TextCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
