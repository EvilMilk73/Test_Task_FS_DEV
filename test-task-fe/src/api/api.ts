import { RecipeGetDto } from "@/models/recipe-models";

export const fetchRecipes = async (filter: {
  ingredient?: string;
  country?: string;
  category?: string;
}): Promise<RecipeGetDto[]> => {
  const filteredFilter = Object.fromEntries(
    Object.entries(filter).filter(([, value]) => value !== undefined)
  );

  const params = new URLSearchParams(filteredFilter);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/recipe?${params.toString()}`
  );

  const data = await res.json();
  return data;
};

export const fetchRecipeById = async (id: string): Promise<RecipeGetDto> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/recipe/${id}`
  );
  const data = await res.json();
  return data[0];
};
