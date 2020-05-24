import * as React from 'react';
import { Field } from 'react-final-form';
import { TextInput } from 'evergreen-ui';
import { StyledField } from './StyledField';

export interface OriginalUrlInputProps {}

export const OriginalUrlInput: React.FC<OriginalUrlInputProps> = () => {
  return (
    <Field name="originalUrl">
      {({ input, meta }) => (
        <StyledField
          label="Original URL"
          labelFor="originalUrl"
          validationMessage={meta.error && meta.touched && meta.error}
        >
          <TextInput id="originalUrl" width="100%" maxWidth={400} {...input} />
        </StyledField>
      )}
    </Field>
  );
};
