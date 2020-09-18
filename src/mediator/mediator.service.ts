import { Injectable, BadRequestException } from '@nestjs/common';

import { ICategory, IToy, IToyAggregate } from '../interfaces';
import { ToyAggregate } from '../entities';
import { CategoriesService } from './categories.service';
import { ToysService } from './toys.service';

@Injectable()
export class MediatorService {
  constructor(
    private categoriesService: CategoriesService,
    private toysService: ToysService,
  ) { }

  // categories

  async findCategories(): Promise<ICategory[]> {
    return this.categoriesService.findAll();
  }

  async findCategoryById(id: string): Promise<ICategory> {
    return this.categoriesService.findOneById(id);
  }

  async findCategoryByName(name: string): Promise<ICategory> {
    return this.categoriesService.findOneByName(name);
  }

  async createCategory(name: string): Promise<ICategory> {
    return this.categoriesService.create(name);
  }

  async updateCategory(id: string, name: string): Promise<ICategory> {
    return this.categoriesService.update(id, name);
  }

  async deleteCategory(id: string): Promise<ICategory> {
    const used = await this.checkUsingCategory(id);

    if (used) {
      throw new BadRequestException(`Category ${id} is used`);
    }

    return this.categoriesService.delete(id);
  }

  async checkUsingCategory(id: string): Promise<boolean> {
    const toys = await this.toysService.findAll();
    const used = toys
      .map(t => t.categoryId)
      .filter(categoryId => categoryId === id);
    
    return Boolean(used.length);
  }

  // toys

  async findToys(): Promise<IToyAggregate[]> {
    const toys = await this.toysService.findAll();
    const promises = toys.map(toy =>
      this.findCategoryById(toy.categoryId)
        .then(category => new ToyAggregate(toy, category)));
    
    return await Promise.all(promises);
  }

  async findToyById(id: string): Promise<IToyAggregate> {
    const toy = await this.toysService.findOneById(id);
    const category = await this.findCategoryById(toy.categoryId);

    return new ToyAggregate(toy, category);
  }

  async createToy(data: Partial<IToy>): Promise<IToyAggregate> {
    const toy = await this.toysService.create(data);
    const category = await this.findCategoryById(toy.categoryId);

    return new ToyAggregate(toy, category);
  }

  async replaceToy(id: string, data: IToy): Promise<IToyAggregate> {
    const toy = await this.toysService.replace(id, data);
    const category = await this.findCategoryById(toy.categoryId);

    return new ToyAggregate(toy, category);
  }

  async updateToy(id: string, data: Partial<IToy>): Promise<IToyAggregate> {
    const toy = await this.toysService.update(id, data);
    const category = await this.findCategoryById(toy.categoryId);

    return new ToyAggregate(toy, category);
  }

  async deleteToy(id): Promise<IToyAggregate> {
    const toy = await this.toysService.delete(id);
    const category = await this.findCategoryById(toy.categoryId);

    return new ToyAggregate(toy, category);
  }

  async increaseToyQuantity(id: string, quantity: number): Promise<IToyAggregate> {
    const toy = await this.toysService.increaseQuantity(id, quantity);
    const category = await this.findCategoryById(toy.categoryId);

    return new ToyAggregate(toy, category);
  }

  async decreaseToyQuantity(id: string, quantity: number): Promise<IToyAggregate> {
    const toy = await this.toysService.decreaseQuantity(id, quantity);
    const category = await this.findCategoryById(toy.categoryId);

    return new ToyAggregate(toy, category);
  }
}
