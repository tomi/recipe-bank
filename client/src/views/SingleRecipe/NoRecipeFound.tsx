import * as React from 'react';
import { IconButton, Heading, Paragraph } from 'evergreen-ui';

import { AppLayout } from '../../app/AppLayout';
import { useNavigation } from '../../navigation';

export interface NoRecipeFoundProps {}

export const NoRecipeFound: React.FC<NoRecipeFoundProps> = () => {
  const { navigateToAllRecipes } = useNavigation();
  return (
    <AppLayout>
      <AppLayout.Header>
        <IconButton icon="arrow-left" onClick={navigateToAllRecipes} />
      </AppLayout.Header>
      <AppLayout.Content>
        <Heading>Recipe not found</Heading>
        <Paragraph marginTop={8}>
          The recipe you were looking for doesn&apos;t exist. See{' '}
          <a
            href="/recipes"
            style={{
              display: 'contents',
            }}
          >
            all the recipes
          </a>
          .
        </Paragraph>
      </AppLayout.Content>
    </AppLayout>
  );
};
