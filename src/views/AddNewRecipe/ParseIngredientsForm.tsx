import * as React from 'react';
import {
  parseIngredients,
  IParseResult,
  IParsedIngredient,
} from '../../overmind/recipes/IngredientParser';
import { Textarea } from 'evergreen-ui';
import { StyledField } from './inputs/StyledField';

interface IParseIngredientsFormProps {
  onIngredientsParsed: (result: IParseResult) => void;
}

const ParsedPart: React.FC = ({ children }) => {
  return (
    <span className="border rounded-sm border-dashed mx-2 p-2">{children}</span>
  );
};

export interface ParsedIngredientProps {
  ingredient: IParsedIngredient;
}

export const ParsedIngredient: React.FC<ParsedIngredientProps> = ({
  ingredient,
}) => {
  return (
    <div className="flex">
      {ingredient.quantity && <ParsedPart>{ingredient.quantity}</ParsedPart>}
      {ingredient.unit && <ParsedPart>{ingredient.unit}</ParsedPart>}
      <ParsedPart>{ingredient.name}</ParsedPart>
    </div>
  );
};

export const ParseIngredientsForm: React.FC<IParseIngredientsFormProps> = ({
  onIngredientsParsed,
}) => {
  const [
    parsedIngredients,
    setParsedIngredients,
  ] = React.useState<IParseResult | null>(null);

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
              <ParsedIngredient ingredient={i} />
            ))
          : null}
      </StyledField>
    </form>
  );
};
