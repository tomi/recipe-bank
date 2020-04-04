import * as React from 'react';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';

import {
  CookingDuration,
  IRecipeCategory,
} from '../../overmind/recipes/models';
import { AppLayout, Title } from '../../app/AppLayout';
import { IconButton } from 'evergreen-ui';
import { useHistory } from 'react-router-dom';
import { NameInput, validateName } from './inputs/NameInput';
import { DurationInput } from './inputs/DurationInput';
import {
  CategoriesInput,
  validateCategories,
  CategoryCheckedState,
} from './inputs/CategoriesInput';
import { TagsInput } from './inputs/TagsInput';
import { IngredientsInput } from './inputs/IngredientsInput';
import { InstructionsInput } from './inputs/InstructionsInput';
import {
  NumPortionsInput,
  validateNumPortions,
} from './inputs/NumPortionsInput';

export interface AddNewRecipeViewProps {}

export interface RecipeCategoriesSelectProps {
  categories: IRecipeCategory[];
}

interface IIngredientData {
  quantity?: string;
  unit?: string;
  value?: string;
}

interface IFormData {
  name?: string;
  numPortions?: string;
  duration?: CookingDuration;
  categories?: CategoryCheckedState[];
  tags?: string[];
  ingredients?: IIngredientData[];
  instructions?: string;
}

export const AddNewRecipeView: React.FC<AddNewRecipeViewProps> = () => {
  const history = useHistory();

  console.log('Render form');

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const validate = (values: IFormData) => {
    console.log('Validating', values);

    return {
      name: validateName(values.name),
      numPortions: validateNumPortions(values.numPortions),
      categories: validateCategories(values.categories),
    };
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
        <Form<IFormData>
          onSubmit={onFinish}
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

              <input type="submit" />
            </form>
          )}
        </Form>
      </AppLayout.Content>
    </AppLayout>
  );
};