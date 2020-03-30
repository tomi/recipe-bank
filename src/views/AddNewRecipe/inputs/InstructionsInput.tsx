import * as React from 'react';
import { Field } from 'react-final-form';
import { Textarea } from 'evergreen-ui';

import { StyledField } from './StyledField';

export interface InstructionsInputProps {}

export const InstructionsInput: React.FC<InstructionsInputProps> = () => {
  return (
    <Field name="instructions">
      {({ input }) => (
        <StyledField label="Instructions" isRequired>
          <Textarea className="h-64" {...input} />
        </StyledField>
      )}
    </Field>
  );
};
