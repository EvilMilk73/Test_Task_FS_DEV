"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { RecipeGetDto } from "@/models/recipe-models";
import { fetchRecipeById } from "@/api/api";

export default function RecipeDetailPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<RecipeGetDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecipe = async () => {
      if (!id || Array.isArray(id)) return;

      const data = await fetchRecipeById(id);
      setRecipe(data);
      setLoading(false);
    };

    loadRecipe();
  }, [id]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!recipe) return <p className="p-4 text-red-500">Recipe not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <Image
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            width={500}
            height={300}
            className="rounded-xl object-cover w-full"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-center">{recipe.strMeal}</h1>
          <p className="text-center text-gray-600 mt-2">
            Country:{" "}
            <Link
              href={`/recipe?country=${recipe.strArea}`}
              className="text-blue-600 underline"
            >
              {recipe.strArea}
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Instructions</h2>
        <p className="text-white whitespace-pre-wrap">
          {recipe.strInstructions}
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc pl-6 space-y-1">
          {recipe.Ingredients.map((ing, i) => (
            <li key={i}>
              <Link
                href={`/recipe?ingredient=${encodeURIComponent(
                  ing.ingredientName
                )}`}
                className="text-blue-600 hover:underline"
              >
                {ing.ingredientName} - {ing.ingredientMeasurement}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
