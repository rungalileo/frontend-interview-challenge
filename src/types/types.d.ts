export type RecipesResponse = {
  data: Recipe[];
  limit: number;
  nextStartingToken: number | null;
  page: number;
  total: number;
  totalPages: number;
};

export type Recipe = {
  id: number;
  name: string;
  ingredients: {
    id: number;
    name: string;
  }[];
  instructions: string[];
};
