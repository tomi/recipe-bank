export const required = (fieldName: string, isPlural = false) => (
  value?: string,
) => {
  if (!value) {
    return `${fieldName} ${isPlural ? 'are' : 'is'} required`;
  }

  return undefined;
};
