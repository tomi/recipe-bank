import * as React from 'react';
import { Field } from 'react-final-form';
import { Textarea } from 'evergreen-ui';

import { StyledField } from './StyledField';
import * as validators from './validators';

export const validateInstructions = validators.required('Instructions', true);

export interface InstructionsInputProps {}

export const InstructionsInput: React.FC<InstructionsInputProps> = () => {
  return (
    <Field name="instructions">
      {({ input, meta }) => (
        <StyledField
          label="Instructions"
          isRequired
          validationMessage={meta.error && meta.touched && meta.error}
        >
          <Textarea className="h-64" {...input} />
        </StyledField>
      )}
    </Field>
  );
};
