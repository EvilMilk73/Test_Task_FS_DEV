"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { fetchRecipes } from "@/api/api";
import { RecipeGetDto } from "@/models/recipe-models";
import Link from "next/link";

const RecipeListComponent = () => {
  const searchParams = useSearchParams();
  const [recipes, setRecipes] = useState<RecipeGetDto[]>([]);

  useEffect(() => {
    const ingredient = searchParams.get("ingredient");
    const country = searchParams.get("country");
    const category = searchParams.get("category");

    const fetchData = async () => {
      const data = await fetchRecipes({
        ingredient: ingredient ?? undefined,
        country: country ?? undefined,
        category: category ?? undefined,
      });
      setRecipes(data);
    };

    fetchData();
  }, [searchParams]);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <div key={index} className="border rounded-lg p-4 ">
              <Link href={`/recipe/${recipe.idMeal}`}>
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h3 className="mt-2 text-lg font-medium">{recipe.strMeal}</h3>
              </Link>
            </div>
          ))
        ) : (
          <div>No recipes found</div>
        )}
      </div>
    </div>
  );
};

export default RecipeListComponent;
