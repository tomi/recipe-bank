import * as React from 'react';
import { Field } from 'react-final-form';
import { SegmentedControl } from 'evergreen-ui';
import { CookingDuration } from '../../../overmind/recipes/models';
import { formatDuration } from '../../../ui/formatters';
import { StyledField } from './StyledField';

export interface IDurationInputProps {}

export const DurationInput: React.FC<IDurationInputProps> = () => {
  return (
    <Field name="duration">
      {({ input }) => (
        <StyledField label="Duration" isRequired>
          <SegmentedControl
            name={input.name}
            width="100%"
            height={24}
            {...input}
            options={Object.values(CookingDuration).map((v) => ({
              label: formatDuration(v),
              value: v,
            }))}
          />
        </StyledField>
      )}
    </Field>
  );
};
