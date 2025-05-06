import { Controller, Get, Param, Query } from '@nestjs/common';
import { RecipeService } from './Recipes/recipe.service';
import { RecipeFilterDto } from './Recipes/recipe.models';

@Controller('recipe')
export class AppController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  get(@Query() recipeFilterDto: RecipeFilterDto) {
    const isNoFilter = Object.values(recipeFilterDto).every(
      (value) => value === undefined,
    );

    if (isNoFilter) {
      return this.recipeService.getAllVailable();
    } else {
      return this.recipeService.getFiltered(recipeFilterDto);
    }
  }

  @Get(':id')
  getById(@Param('id') mealId: string) {
    return this.recipeService.getOne(mealId);
  }
}
