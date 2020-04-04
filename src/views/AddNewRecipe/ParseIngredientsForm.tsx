import * as React from 'react';
import { Textarea } from 'evergreen-ui';

import {
  parseIngredients,
  ParseResult,
  ParsedIngredient,
} from '../../overmind/recipes/IngredientParser';
import { StyledField } from './inputs/StyledField';

interface ParseIngredientsFormProps {
  onIngredientsParsed: (result: ParseResult) => void;
}

const ParsedPart: React.FC = ({ children }) => {
  return (
    <span className="border rounded-sm border-dashed mx-2 p-2">{children}</span>
  );
};

export interface ParsedIngredientProps {
  ingredient: ParsedIngredient;
}

const Ingredient: React.FC<ParsedIngredientProps> = ({ ingredient }) => {
  return (
    <div className="flex">
      {ingredient.quantity && <ParsedPart>{ingredient.quantity}</ParsedPart>}
      {ingredient.unit && <ParsedPart>{ingredient.unit}</ParsedPart>}
      <ParsedPart>{ingredient.name}</ParsedPart>
    </div>
  );
};

export const ParseIngredientsForm: React.FC<ParseIngredientsFormProps> = ({
  onIngredientsParsed,
}) => {
  const [
    parsedIngredients,
    setParsedIngredients,
  ] = React.useState<ParseResult | null>(null);

  const onInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log('ONCHANGE');
    const parsed = parseIngredients(event.target.value);
    console.log(parsed);

    setParsedIngredients(parsed);
    onIngredientsParsed(parsed);
  };
  console.log('render', parsedIngredients);

  return (
    <form>
      <StyledField label="Ingredients as text">
        <Textarea rows={10} onChange={onInputChange} />
      </StyledField>

      <StyledField label="Parse result">
        {parsedIngredients
          ? parsedIngredients.ingredients.map((i) => (
              <Ingredient ingredient={i} />
            ))
          : null}
      </StyledField>
    </form>
  );
};
