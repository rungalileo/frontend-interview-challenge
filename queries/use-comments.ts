import { useQuery } from "react-query";

export const useComments = () => {
  const response = useQuery(
    ["COMMENTS"],
    async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/comments");
      const data = await res.json();

      return data;
    },
    {
      onError: (err) => console.error("comments", err),
    }
  );

  return response;
};
