import useGetRecipes from '@/hooks/query-hooks/use-get-recipes';
import { Button, Card, Center, Container, ScrollArea, Stack, Title } from '@mantine/core';

/**
 * Instructions:
 * 
 * 1. Ensure that the home page properly renders a list of recipes.
 * 2. Add a new feature to load more recipes when the user clicks on a button.
 * 3. Add a filter feature to filter recipes.
 * 4. Add a new dynamic route to render a recipe. Users should be able to click a recipe and navigate to the recipe's page.
 * 5. The recipe's page should display the recipe's name, ingredients, and ingredients.
 */

const Home = () => {
  // Query Hooks
  const { recipes } = useGetRecipes();

  // Render
  return (
    <Container h='100vh'>
      <Title>Recipe Finder</Title>
      <ScrollArea h={600} mt='xl'>
        <Stack mt='xl'>
          {recipes.map((recipe) => (
            <Card key={recipe.id} withBorder>
              {recipe.name}
            </Card>
          ))}
        </Stack>
      </ScrollArea>
      <Center mt='lg'>
        <Button>Load more recipes</Button>
      </Center>
    </Container>
  );
};

export default Home;