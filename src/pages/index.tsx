import useGetRecipes from '@/hooks/query-hooks/use-get-recipes';
import { Button, Card, Center, Container, ScrollArea, Stack, TextInput, Title } from '@mantine/core';
import Link from 'next/link';
import { useState, useEffect } from 'react';

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

  // Local state
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  // Effects
  useEffect(() => {
    if (searchTerm == null || searchTerm === '') {
      setFilteredRecipes(recipes);
      return;
    }

    const f = recipes
      ?.filter((recipe) => recipe.name.toLowerCase().includes(searchTerm?.toLowerCase() || ''))

    setFilteredRecipes(f);
  }, [searchTerm, recipes]);

  // Render
  return (
    <Container h='100vh'>
      <Title>Recipe Finder</Title>
      <TextInput placeholder='Search for recipes' onChange={(event) => setSearchTerm(event.currentTarget.value)} />
      <ScrollArea h={600} mt='xl'>
        <Stack mt='xl'>
          {filteredRecipes?.map((recipe) => (
            <Link key={recipe.id} href={`/recipes/${recipe.id}`}>
              <Card withBorder >
                {recipe.name}
              </Card>
            </Link>
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