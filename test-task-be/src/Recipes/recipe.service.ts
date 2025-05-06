import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { RecipeFilterDto, RecipeReceiveDto } from './recipe.models';
import { propertyToUrlSymbol } from './recipe.models';
import { map } from 'rxjs/operators';
import { convertToRecipeGetDto } from 'src/utils/recipe.utils';

@Injectable()
export class RecipeService {
  constructor(private httpService: HttpService) {}

  getAllVailable() {
    return this.httpService
      .get<RecipeReceiveDto>(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      )
      .pipe(
        map((response) => {
          return convertToRecipeGetDto(response.data);
        }),
      );
  }

  getFiltered(recipeFilterDto: RecipeFilterDto) {
    const params = Object.keys(propertyToUrlSymbol)
      .map((key) => {
        const dtoKey = key as keyof typeof recipeFilterDto;
        const value = recipeFilterDto[dtoKey];
        const symbol = propertyToUrlSymbol[dtoKey];

        return value ? `${symbol}=${encodeURIComponent(value)}` : '';
      })
      .filter(Boolean)
      .join('&');

    return this.httpService
      .get<RecipeReceiveDto>(
        `https://www.themealdb.com/api/json/v1/1/filter.php?${params}`,
      )
      .pipe(
        map((response) => {
          return convertToRecipeGetDto(response.data);
        }),
      );
  }

  getOne(mealId: string) {
    return this.httpService
      .get<RecipeReceiveDto>(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`,
      )
      .pipe(map((response) => convertToRecipeGetDto(response.data)));
  }
}
