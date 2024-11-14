import { RecipesResponse } from "@/types/types";
import { useInfiniteQuery } from "@tanstack/react-query"


export default function useGetRecipes() {

  // Fetcher
  async function fetchRecipes({ pageParam = 1, limit = 10 }): Promise<RecipesResponse> {
    const resp = await fetch('/api/get-recipes?page=' + pageParam + '&limit=' + limit)
      .then((response) => response.json())
      .catch((error) => {
        throw new Error(error.message)
      });

    console.log(resp)
    return resp;
  }

  const query = useInfiniteQuery({
    queryKey: ['recipes'],
    queryFn: fetchRecipes,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextStartingToken,
  })

  return {
    ...query,
    recipes: query.data?.pages.flatMap(page => page.data),
  }
}