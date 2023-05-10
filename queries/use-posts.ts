import { useRouter } from "next/router";
import { useQuery } from "react-query";

export const usePosts = () => {
  const router = useRouter();
  const { postId } = router?.query || {};

  const response = useQuery(
    [`POSTS-${postId}`],
    async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      const data = await res.json();

      return data;
    },
    {
      onError: (err) => console.error("posts", err),
    }
  );

  return response;
};
