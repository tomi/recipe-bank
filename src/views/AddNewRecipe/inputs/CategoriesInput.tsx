import * as React from 'react';
import { Field, useForm } from 'react-final-form';
import { Checkbox } from 'evergreen-ui';

import { StyledField } from './StyledField';
import { useOvermind } from '../../../overmind';

export type CategoryCheckedState = undefined | boolean;

export const validateCategories = (value?: CategoryCheckedState[]) => {
  if (!value) {
    return 'Must select at least one category';
  }
  if (value.length === 0) {
    return 'Must select at least one category';
  }
  if (value.length > 2) {
    return 'Can\'t select more than two categories';
  }

  return undefined;
};

export interface CategoriesInputProps {}

export const CategoriesInput: React.FC<CategoriesInputProps> = () => {
  const { recipes } = useOvermind().state;
  const field = useForm().getFieldState('categories');

  return (
    <StyledField
      label="Category"
      className="mb-3"
      isRequired
      validationMessage={field?.error && field?.touched && field?.error}
    >
      <div className="flex flex-wrap">
        {recipes.recipeCategoryList.map((c) => (
          <Field key={c.id} name={`categories`} value={c.id} type="checkbox">
            {({ input }) => (
              <Checkbox
                key={c.id}
                className="mr-6"
                label={c.name}
                marginBottom={8}
                marginTop={8}
                {...input}
              />
            )}
          </Field>
        ))}
      </div>
    </StyledField>
  );
};
