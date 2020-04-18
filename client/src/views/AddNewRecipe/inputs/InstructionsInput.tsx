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
          <Textarea
            className="h-64"
            onPaste={(event: React.ClipboardEvent<HTMLTextAreaElement>) => {
              const { clipboardData } = event;
              if (event.currentTarget.value) {
                return;
              }

              event.stopPropagation();
              event.preventDefault();

              const text = trimPastedText(clipboardData.getData('Text'));
              input.onChange(text);
            }}
            {...input}
          />
        </StyledField>
      )}
    </Field>
  );
};

const trimPastedText = (text: string) =>
  text
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => !!l)
    .join('\n');
