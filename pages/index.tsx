import {
  Box,
  Button,
  Container,
  Group,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Table from "../components/table";
import { usePosts } from "../queries/use-posts";

interface PushArgs {
  key: "postId" | "searchTerm";
  value: string | number;
}

const Home: NextPage = () => {
  const router = useRouter();

  // RQ post fetching hook
  const post = usePosts();

  // Helper to make working with router.push easier
  const push = ({ key, value }: PushArgs) => {
    router.push({
      pathname: "/",
      query: {
        ...router.query,
        [key]: value,
      },
    });
  };

  // Handler to navigate between posts
  const scrollPosts = (direction: string) => {
    if (direction === "next") {
      push({ key: "postId", value: ++post.data.id });
    } else {
      push({ key: "postId", value: --post.data.id });
    }
  };

  return (
    <Container fluid>
      <Title order={1} mb="xl">
        Galileo Coding Challenge
      </Title>

      <Title order={3}>Post #{post?.data?.id}</Title>
      <Text>{post?.data?.title}</Text>
      <Text>{post?.data?.body}</Text>

      <Group position="apart" my="xl">
        <TextInput
          onChange={({ target }) => console.log(target.value)}
          placeholder="Search comments for this post"
          type="search"
          sx={{
            flex: 1,
          }}
        />

        <Box>
          <Button onClick={() => scrollPosts("prev")} mr="xs">
            Prev Post
          </Button>
          <Button onClick={() => scrollPosts("next")}>Next Post</Button>
        </Box>
      </Group>
    </Container>
  );
};

export default Home;
