import * as React from 'react';
import { FormField, FormFieldProps } from 'evergreen-ui';

export type StyledFieldProps = FormFieldProps;

export const formFieldClassName = 'mb-6';

export const StyledField: React.FC<StyledFieldProps> = ({
  children,
  ...props
}) => {
  return (
    <FormField {...props} className={formFieldClassName}>
      {children}
    </FormField>
  );
};
