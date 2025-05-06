import {
  Ingredient,
  RecipeDetailDto,
  RecipeGetDto,
  RecipeReceiveDto,
} from 'src/Recipes/recipe.models';

export function convertToRecipeGetDto(
  recipe: RecipeReceiveDto,
): RecipeGetDto[] {
  return recipe.meals.map((recipeDetails) => {
    const ingredients: Ingredient[] = [];

    for (let i = 1; i <= 20; i++) {
      const ingredientName = recipeDetails[
        `strIngredient${i}` as keyof RecipeDetailDto
      ] as string;
      const ingredientMeasurement = recipeDetails[
        `strMeasure${i}` as keyof RecipeDetailDto
      ] as string;

      if (ingredientName && ingredientName.trim()) {
        ingredients.push({
          ingredientName: ingredientName.trim(),
          ingredientMeasurement: ingredientMeasurement
            ? ingredientMeasurement.trim()
            : '',
        });
      }
    }

    return {
      ...recipeDetails,
      Ingredients: ingredients,
    };
  });
}
