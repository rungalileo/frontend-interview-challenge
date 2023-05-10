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
import { usePosts } from "../queries/use-posts";
import { useEffect, useState } from "react";
import { useComments } from "../queries/use-comments";
import Table from "../components/table";

interface PushArgs {
  key: "postId" | "searchTerm";
  value: string | number;
}

interface Comment {
  postId: number;
  body: string;
}

const Home: NextPage = () => {
  const router = useRouter();
  const [filteredComments, setFilteredComments] = useState([]);

  // RQ post fetching hook
  const post = usePosts();
  const comments = useComments();
  const columns = Object.keys(comments?.data?.[0]) || [];

  let postComments = comments.data.filter(
    (comment: Comment) => comment.postId === post.data.id
  );

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

  useEffect(() => {
    if (!router.query.postId || router.query.postId === "0") {
      push({ key: "postId", value: 1 });
    }
  }, [router.query.postId]);

  console.log(comments);

  const filterComments = (searchTerm: string) => {
    const newComments = postComments.filter((comment: Comment) =>
      comment.body.includes(searchTerm)
    );

    setFilteredComments(newComments);
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
          onChange={({ target }) => filterComments(target.value)}
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
      <Table data={filteredComments} columns={columns} />
    </Container>
  );
};

export default Home;
