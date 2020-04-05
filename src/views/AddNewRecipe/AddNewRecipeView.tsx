import * as React from 'react';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { IconButton, Button } from 'evergreen-ui';
import { useHistory } from 'react-router-dom';

import {
  CookingDuration,
  RecipeCategory,
  RecipeCategoryId,
  CreateRecipeDto,
} from '../../overmind/recipes/models';
import { AppLayout, Title } from '../../app/AppLayout';
import { NameInput, validateName } from './inputs/NameInput';
import { DurationInput } from './inputs/DurationInput';
import { CategoriesInput, validateCategories } from './inputs/CategoriesInput';
import { TagsInput } from './inputs/TagsInput';
import {
  IngredientsInput,
  IngredientData,
  validateIngredients,
  filterEmpty,
} from './inputs/IngredientsInput';
import {
  InstructionsInput,
  validateInstructions,
} from './inputs/InstructionsInput';
import {
  NumPortionsInput,
  validateNumPortions,
} from './inputs/NumPortionsInput';
import { useOvermind } from '../../overmind';
import { parseQty } from '../../overmind/recipes/IngredientParser';

export interface AddNewRecipeViewProps {}

export interface RecipeCategoriesSelectProps {
  categories: RecipeCategory[];
}

interface FormData {
  name: string;
  numPortions: string;
  duration: CookingDuration;
  categories: RecipeCategoryId[];
  tags: string[];
  ingredients: IngredientData[];
  instructions: string;
}

type UnvalidatedFormData = Partial<FormData>;

type FormValidateResult = {
  [P in keyof FormData]?: string | string[] | undefined;
};

export const AddNewRecipeView: React.FC<AddNewRecipeViewProps> = () => {
  const history = useHistory();
  const { actions } = useOvermind();

  const onFinish = async (values: FormData) => {
    const dto = formToDto(values);

    await actions.recipes.createNewRecipe(dto);

    history.push('/recipes');
  };

  const validate = (values: UnvalidatedFormData): FormValidateResult => {
    const result = {
      name: validateName(values.name),
      numPortions: validateNumPortions(values.numPortions),
      categories: validateCategories(values.categories),
      ingredients: validateIngredients(values.ingredients),
      instructions: validateInstructions(values.instructions),
    };

    return result;
  };

  return (
    <AppLayout>
      <AppLayout.Header>
        <IconButton
          icon="arrow-left"
          onClick={() => history.push('/recipes')}
        />
        <Title className="ml-4">Add new recipe</Title>
      </AppLayout.Header>
      <AppLayout.Content>
        <Form<UnvalidatedFormData>
          onSubmit={onFinish as any}
          validate={validate}
          mutators={{ ...arrayMutators }}
          initialValues={{
            duration: CookingDuration.Between15And30,
            ingredients: [{}, {}, {}, {}, {}],
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <NameInput />
              <NumPortionsInput />
              <DurationInput />
              <CategoriesInput />
              <TagsInput />
              <IngredientsInput />
              <InstructionsInput />

              <Button type="submit" appearance="primary" iconBefore="add">
                Add
              </Button>
            </form>
          )}
        </Form>
      </AppLayout.Content>
    </AppLayout>
  );
};

const formToDto = (form: FormData): CreateRecipeDto => {
  return {
    ...form,
    numPortions: Number(form.numPortions),
    ingredients: form.ingredients.filter(filterEmpty).map((i) => ({
      ingredientText: i.name!,
      quantity: i.qty ? parseQty(i.qty) : undefined,
      unit: i.unit,
    })),
  };
};
