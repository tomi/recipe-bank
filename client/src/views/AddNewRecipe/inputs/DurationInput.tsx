import * as React from 'react';
import { Field } from 'react-final-form';
import { SegmentedControl } from 'evergreen-ui';
import { CookingDuration } from '../../../overmind/recipes/models';
import { formatDuration } from '../../../ui/formatters';
import { StyledField } from './StyledField';

const durations = Object.values(CookingDuration).map<CookingDuration>(
  (v) => v as CookingDuration,
);

export interface DurationInputProps {}

export const DurationInput: React.FC<DurationInputProps> = () => {
  return (
    <Field name="duration">
      {({ input }) => (
        <StyledField label="Duration" isRequired>
          <SegmentedControl
            name={input.name}
            width="100%"
            height={24}
            {...input}
            options={durations.map((duration) => ({
              label: formatDuration(duration),
              value: duration,
            }))}
          />
        </StyledField>
      )}
    </Field>
  );
};
