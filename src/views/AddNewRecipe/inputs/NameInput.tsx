import * as React from 'react';
import { Field } from 'react-final-form';
import { TextInput } from 'evergreen-ui';
import { StyledField } from './StyledField';
import * as validators from './validators';

export const validateName = validators.required('Name');

export interface NameInputProps {}

export const NameInput: React.FC<NameInputProps> = () => {
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
