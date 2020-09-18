import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { ICategory, ICategoryRequest } from '../interfaces';
import { MediatorService } from '../mediator/mediator.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('categories')
export class CategoriesController {
  constructor(private mediatorService: MediatorService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: ICategoryRequest): Promise<ICategory> {
    console.log('REQUEST CategoriesController.create', body);
    const res = await this.mediatorService.createCategory(body.name);
    console.log('RESPONSE CategoriesController.create', res);

    return res;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<{ categories: ICategory[] }> {
    console.log('REQUEST CategoriesController.findAll');
    const categories = await this.mediatorService.findCategories();
    console.log('RESPONSE CategoriesController.findAll', { categories });

    return { categories };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<ICategory> {
    console.log('REQUEST CategoriesController.findOneById', id);
    const res = await this.mediatorService.findCategoryById(id);
    console.log('RESPONSE CategoriesController.findOneById', res);

    return res;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: ICategoryRequest): Promise<ICategory> {
    console.log('REQUEST CategoriesController.update', id, body);
    const res = await this.mediatorService.updateCategory(id, body.name);
    console.log('RESPONSE CategoriesController.update', res);

    return res;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ICategory> {
    console.log('REQUEST CategoriesController.delete', id);
    const res = await this.mediatorService.deleteCategory(id);
    console.log('RESPONSE CategoriesController.delete', res);

    return res;
  }
}
