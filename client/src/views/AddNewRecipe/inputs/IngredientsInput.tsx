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
  FormFieldValidationMessage,
} from 'evergreen-ui';
import { Option, some, none, isNone } from 'fp-ts/lib/Option';

import { formFieldClassName } from './StyledField';
import './IngredientsInput.css';
import { ParseIngredientsForm } from '../ParseIngredientsForm';
import { ParseResult } from '../../../overmind/recipes/IngredientParser';
import { formatQuantity } from '../../../ui/formatters';

export interface IngredientData {
  qty?: string;
  unit?: string;
  name?: string;
}

export const filterEmpty = (ingredient: IngredientData) =>
  !!ingredient.qty || !!ingredient.unit || !!ingredient.name;

const isIngredientDefined = (ingredient: IngredientData) => !!ingredient.name;

export const validateIngredients = (ingredients?: IngredientData[]) => {
  let error: string | undefined;

  if (!ingredients) {
    error = 'At least one ingredient must be defined';
  } else if (ingredients.length < 1) {
    error = 'At least one ingredient must be defined';
  } else if (!ingredients.some(isIngredientDefined)) {
    error = 'At least one ingredient must be defined';
  }

  return error ? [error] : [];
};

export interface IngredientsInputProps {}

export interface QuantityUnitInputProps {
  name: string;
}

const QuantityUnitInput: React.FC<QuantityUnitInputProps> = ({ name }) => (
  <div
    className="flex flex-row rounded-sm quantity-unit-input mr-2"
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

interface IngredientInputProps {
  name: string;
  onRemove: () => void;
}

const IngredientInput: React.FC<IngredientInputProps> = ({
  name,
  onRemove,
}) => {
  return (
    <div key={name} className="flex flex-row w-full mb-2 flex-wrap">
      <QuantityUnitInput name={name} />

      <Field name={`${name}.name`}>
        {({ input }) => <TextInput className="flex-1 mr-2" {...input} />}
      </Field>

      <IconButton icon="minus" onClick={onRemove} />
    </div>
  );
};

export interface ErrorMessageProps {
  touched?: boolean;
  error?: string[];
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  touched,
  error,
}) => {
  if (!touched || !error || error.every((x) => !x)) {
    return null;
  }

  return (
    <FormFieldValidationMessage className="my-2">
      {error}
    </FormFieldValidationMessage>
  );
};

export const IngredientsInput: React.FC<IngredientsInputProps> = () => {
  const [isDialogShown, setIsDialogShown] = React.useState(false);
  const [maybeParseResult, setParseResult] = React.useState<
    Option<ParseResult>
  >(none);

  return (
    <FieldArray name="ingredients">
      {({ fields, meta }) => (
        <div className={formFieldClassName}>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <Label>
                Ingredients <span title="This field is required.">*</span>
              </Label>
              <ErrorMessage touched={meta.touched} error={meta.error as any} />
            </div>

            <Button
              className="float-right self-end"
              appearance="minimal"
              onClick={() => setIsDialogShown(true)}
            >
              Parse
            </Button>
          </div>

          {fields.map((name, index) => (
            <IngredientInput
              key={name}
              name={name}
              onRemove={() => fields.remove(index)}
            />
          ))}

          <button
            type="button"
            className="border-dashed border-gray-500 border-2 p-2 hover:border-gray-800 active:border-gray-500 w-full"
            onClick={() => fields.push({ qty: '', unit: '', name: '' })}
          >
            <Icon icon="plus" className="inline-block mr-2" />
            Add ingredient
          </button>

          <Dialog
            isShown={isDialogShown}
            title="Dialog title"
            shouldCloseOnOverlayClick={false}
            onCloseComplete={() => {
              setIsDialogShown(false);

              if (isNone(maybeParseResult)) {
                return;
              }

              const parseResult = maybeParseResult.value;
              // eslint-disable-next-line no-plusplus
              for (let i = 0; i < parseResult.ingredients.length; i++) {
                const result = parseResult.ingredients[i];
                const newIngredient = {
                  qty: result.quantity
                    ? formatQuantity(result.quantity)
                    : undefined,
                  unit: result.unit,
                  name: result.name,
                };

                fields.update(i, newIngredient);
              }
            }}
            confirmLabel="Parse"
          >
            <ParseIngredientsForm
              onIngredientsParsed={(maybeResult: ParseResult) => {
                setParseResult(some(maybeResult));
              }}
            />
          </Dialog>
        </div>
      )}
    </FieldArray>
  );
};
