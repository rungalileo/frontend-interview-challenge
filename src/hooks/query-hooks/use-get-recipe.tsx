import { Recipe } from "@/types/types";
import { useQuery } from "@tanstack/react-query"

export default function useGetRecipe(id: number | string | undefined) {

  async function fetchRecipe(): Promise<Recipe> {
    return await fetch(`/api/get-recipe?id=${id}`)
      .then((response) => response.json())
      .then((data) => data.data)
      .catch((error) => {
        throw new Error(error.message)
      });
  }

  return useQuery({
    queryKey: ['recipe'],
    queryFn: fetchRecipe,
    enabled: id != null,
  })
}