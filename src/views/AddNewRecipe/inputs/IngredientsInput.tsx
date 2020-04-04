import * as React from 'react';
import { FieldArray } from 'react-final-form-arrays';
import { Field } from 'react-final-form';
import {
  TextInput,
  Icon,
  IconButton,
  Label,
  Button,
  Dialog,
  Autocomplete,
} from 'evergreen-ui';

import { formFieldClassName } from './StyledField';
import './IngredientsInput.css';
import { Option, some, none, isNone } from 'fp-ts/lib/Option';
import { ParseIngredientsForm } from '../ParseIngredientsForm';
import { ParseResult } from '../../../overmind/recipes/IngredientParser';

export interface IngredientsInputProps {}

export interface QuantityUnitInputProps {
  name: string;
}

const QuantityUnitInput: React.FC<QuantityUnitInputProps> = ({ name }) => (
  <div
    className="flex flex-row rounded-sm quantity-unit-input"
    style={{
      border: '1px solid rgba(67, 90, 111, 0.3)',
    }}
  >
    <Field name={`${name}.qty`}>
      {({ input }) => (
        <TextInput
          className="border-none text-right pr-2 outline-none"
          width={100}
          {...input}
        />
      )}
    </Field>
    <span
      className="text-xl"
      style={{
        lineHeight: '30px',
        color: 'rgba(67, 90, 111, 0.3)',
      }}
    >
      |
    </span>
    <Field name={`${name}.unit`}>
      {({ input }) => (
        <Autocomplete
          inputValue={input.value}
          onChange={(changedItem) => input.onChange(changedItem)}
          items={['kg', 'g', 'ml', 'l', ...(input.value ? [input.value] : [])]}
        >
          {({ getInputProps, getRef, openMenu }) => (
            <TextInput
              width={80}
              style={{
                height: '30px',
              }}
              innerRef={getRef}
              {...input}
              {...getInputProps({
                onFocus: () => {
                  openMenu();
                },
                onChange: input.onChange,
                onBlur: input.onBlur,
              })}
            />
          )}
        </Autocomplete>
      )}
    </Field>
  </div>
);

export const IngredientsInput: React.FC<IngredientsInputProps> = () => {
  const [isDialogShown, setIsDialogShown] = React.useState(false);
  const [maybeParseResult, setParseResult] = React.useState<
    Option<ParseResult>
  >(none);

  return (
    <FieldArray name="ingredients">
      {({ fields }) => (
        <div className={formFieldClassName}>
          <div>
            <Label>
              Ingredients <span title="This field is required.">*</span>
            </Label>

            <Button
              className="float-right"
              appearance="minimal"
              onClick={() => setIsDialogShown(true)}
            >
              Parse ingredients
            </Button>
          </div>
          {fields.map((name, index) => (
            <div key={name} className="flex flex-row w-full mb-2">
              <QuantityUnitInput name={name} />

              <Field name={`${name}.name`}>
                {({ input }) => (
                  <TextInput className="flex-1 mx-2" {...input} />
                )}
              </Field>

              <IconButton icon="minus" onClick={() => fields.remove(index)} />
            </div>
          ))}

          <button
            className="border-dashed border-gray-500 border-2 p-2 hover:border-gray-800 active:border-gray-500 w-full"
            onClick={() => fields.push({ qty: '', unit: '', name: '' })}
          >
            <Icon icon="plus" className="inline-block mr-2" />
            Add ingredient
          </button>

          <Dialog
            isShown={isDialogShown}
            title="Dialog title"
            onCloseComplete={() => {
              setIsDialogShown(false);

              if (isNone(maybeParseResult)) {
                return;
              }

              const parseResult = maybeParseResult.value;
              for (let i = 0; i < parseResult.ingredients.length; i++) {
                const result = parseResult.ingredients[i];
                const newIngredient = {
                  qty: result.quantity,
                  unit: result.unit,
                  name: result.name,
                };

                fields.update(i, newIngredient);
              }
            }}
            confirmLabel="Parse"
          >
            <ParseIngredientsForm
              onIngredientsParsed={
                (maybeResult: ParseResult) => {
                  setParseResult(some(maybeResult));
                  // const numCurrently = fields.length ?? 0;
                  // if (i < numCurrently) {
                  // } else {
                  //   fields.push(newIngredient);
                  // }
                }
                // setParsedIngredients(some(maybeResult));
              }
            />
          </Dialog>
        </div>
      )}
    </FieldArray>
  );
};
