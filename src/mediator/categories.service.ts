import { Injectable, NotFoundException } from '@nestjs/common';

import { ICategory } from '../interfaces';
import { CategoryEntity } from '../entities';

@Injectable()
export class CategoriesService {
  private readonly categories: ICategory[];

  constructor() {
    this.categories = [
      new CategoryEntity({
        id: '1',
        name: 'Hotwheels',
      }),
    ];
  }

  async findAll(): Promise<ICategory[]> {
    return this.categories;
  }

  async findOneById(id: string): Promise<ICategory> {
    const category = this.categories.find(c => c.id === id);

    if (!category) {
      throw new NotFoundException();
    }

    return category;
  }

  async findOneByName(name: string): Promise<ICategory> {
    const category = this.categories.find(c => c.name === name);

    if (!category) {
      throw new NotFoundException();
    }

    return category;
  }

  async create(name: string): Promise<ICategory> {
    const entity = CategoryEntity.create(name);
    this.categories.push(entity);

    return entity;
  }

  async update(id: string, name: string): Promise<ICategory> {
    const i = this.categories.findIndex(c => c.id === id);

    if (i < 0) {
      throw new NotFoundException();
    }

    this.categories[i].name = name;

    return this.categories[i];
  }

  async delete(id: string): Promise<ICategory> {
    const i = this.categories.findIndex(c => c.id === id);

    if (i < 0) {
      throw new NotFoundException();
    }

    const entity = this.categories[i];

    return entity;
  }
}
