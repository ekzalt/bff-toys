import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';

import { IToy } from '../interfaces';
import { ToyEntity } from '../entities';

@Injectable()
export class ToysService {
  private readonly toys: IToy[];

  constructor() {
    this.toys = [
      new ToyEntity({
        id: '1',
        quantity: 10,
        description: 'some toy',
        categoryId: '1',
      }),
    ];
  }

  async findAll(): Promise<IToy[]> {
    return this.toys;
  }

  async findOneById(id: string): Promise<IToy> {
    const toy = this.toys.find(t => t.id === id);

    if (!toy) {
      throw new NotFoundException();
    }

    return toy;
  }

  async create(toy: Partial<IToy>): Promise<IToy> {
    const entity = ToyEntity.create(toy);
    this.toys.push(entity);

    return entity;
  }

  async replace(id: string, toy: IToy): Promise<IToy> {
    const i = this.toys.findIndex(t => t.id === id);

    if (i < 0) {
      throw new NotFoundException();
    }

    this.toys[i] = new ToyEntity({ ...toy, id });

    return this.toys[i];
  }

  async update(id: string, toy: Partial<IToy>): Promise<IToy> {
    const i = this.toys.findIndex(t => t.id === id);

    if (i < 0) {
      throw new NotFoundException();
    }

    this.toys[i] = new ToyEntity({ ...this.toys[i], ...toy, id });

    return this.toys[i];
  }

  async delete(id): Promise<IToy> {
    const i = this.toys.findIndex(t => t.id === id);

    if (i < 0) {
      throw new NotFoundException();
    }

    const entity = this.toys[i];

    return entity;
  }

  async increaseQuantity(id: string, quantity: number): Promise<IToy> {
    this.validateQuantity(quantity);
    const i = this.toys.findIndex(t => t.id === id);

    if (i < 0) {
      throw new NotFoundException();
    }

    this.toys[i].quantity += quantity;

    return this.toys[i];
  }

  async decreaseQuantity(id: string, quantity: number): Promise<IToy> {
    this.validateQuantity(quantity);
    const i = this.toys.findIndex(t => t.id === id);

    if (i < 0) {
      throw new NotFoundException();
    }

    if ((this.toys[i].quantity - quantity) < 0) {
      throw new BadRequestException('Quantity is too big');
    }

    this.toys[i].quantity -= quantity;

    return this.toys[i];
  }

  // TODO: move this check to tx validation middleware
  validateQuantity(quantity: number) {
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new BadRequestException('Invalid quantity');
    }
  }

  /**
   * validate unique pair of toy and category
   */
  validatePairToyCategory(id: string, toy: Partial<IToy>) {
    // TODO
  }
}
