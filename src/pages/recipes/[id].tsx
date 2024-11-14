import useGetRecipe from '@/hooks/query-hooks/use-get-recipe';
import { Box, Button, Container, List, Text, Title } from '@mantine/core';
import { useRouter } from 'next/router';


const Recipe = () => {
  // Router
  const router = useRouter();
  const id = router.query.id as string | undefined;

  // Query Hooks
  const { data } = useGetRecipe(id);

  // Render
  return (
    <>
      <Container>
        <Button onClick={() => router.back()}>Back</Button>
        <Title>{data?.name}</Title>
        <Box>
          <Text fw={600}>Ingredients</Text>
          <List>
            {data?.ingredients.map((ingredient) => (
              <List.Item key={ingredient.id}>{ingredient.name}</List.Item>
            ))}
          </List>
          <Text fw={600}>Instructions</Text>
          <List>
            {data?.instructions.map((instruction, index) => (
              <List.Item key={index}>{instruction}</List.Item>
            ))}
          </List>
        </Box>
      </Container>
    </>
  );
};

export default Recipe;