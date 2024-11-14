import { Recipe } from "@/types/types";

// Implement the useGetRecipe hook that fetches a single recipe by id
export default function useGetRecipe(id: number | string | undefined) {

  async function fetchRecipe(): Promise<Recipe> {
    await fetch(`/api/get-recipe?id=${id}`)
  }
}