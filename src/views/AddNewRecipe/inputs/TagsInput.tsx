import * as React from 'react';
import { Field } from 'react-final-form';
import { TagInput } from 'evergreen-ui';

import { StyledField } from './StyledField';

export interface TagsInputProps {}

export const TagsInput: React.FC<TagsInputProps> = () => {
  return (
    <StyledField label="Tags" labelFor="tags">
      <Field name="tags">
        {({ input }) => <TagInput name="tags" className="w-full" />}
      </Field>
    </StyledField>
  );
};
