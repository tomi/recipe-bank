import * as React from 'react';
import { Badge } from 'evergreen-ui';

import { RecipeCategoryId } from '../../overmind/recipes/models';
import { useOvermind } from '../../overmind';

export interface RecipeCategoriesProps {
  categoryIds: RecipeCategoryId[];
}

const colors: (
  | 'neutral'
  | 'blue'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'teal'
  | 'purple'
)[] = ['neutral', 'green', 'blue', 'red', 'orange', 'purple', 'yellow', 'teal'];

const getColor = (id: RecipeCategoryId) => colors[Number(id) % colors.length];

export const RecipeCategories: React.FC<RecipeCategoriesProps> = ({
  categoryIds,
}) => {
  const { state } = useOvermind();

  return (
    <>
      {categoryIds.map((id) => {
        const category = state.recipes.recipeCategories[id];
        if (!category) {
          return null;
        }

        return (
          <Badge key={id} color={getColor(id)} marginRight={8}>
            {category.name}
          </Badge>
        );
      })}
    </>
  );
};
