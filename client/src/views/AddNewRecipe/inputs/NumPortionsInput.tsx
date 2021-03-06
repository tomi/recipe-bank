import * as React from 'react';
import { Field } from 'react-final-form';
import { TextInput } from 'evergreen-ui';
import { StyledField } from './StyledField';

export interface NumPortionsInputProps {}

export const validateNumPortions = (value?: string) => {
  if (!value) {
    return 'Number of portions is required';
  }
  if (Number.isNaN(parseInt(value, 10))) {
    return 'Number of portions must be a number';
  }

  return undefined;
};

export const NumPortionsInput: React.FC<NumPortionsInputProps> = () => {
  return (
    <Field name="numPortions">
      {({ input, meta }) => (
        <StyledField
          label="Number of portions"
          labelFor="numPortions"
          isRequired
          validationMessage={meta.error && meta.touched && meta.error}
        >
          <TextInput id="numPortions" width="100%" maxWidth={400} {...input} />
        </StyledField>
      )}
    </Field>
  );
};
