import * as React from 'react';
import { Field } from 'react-final-form';
import { TextInput } from 'evergreen-ui';
import { StyledField } from './StyledField';

export interface INameInputProps {}

export const validateName = (value?: string) => {
  if (!value) {
    return 'Name is required';
  }
};

export const NameInput: React.FC<INameInputProps> = () => {
  return (
    <Field name="name">
      {({ input, meta }) => (
        <StyledField
          label="Name"
          labelFor="name"
          isRequired
          validationMessage={meta.error && meta.touched && meta.error}
        >
          <TextInput id="name" {...input} />
        </StyledField>
      )}
    </Field>
  );
};
