import { v4 as uuidv4 } from 'uuid';
import { IToy } from '../interfaces';

export class ToyEntity implements IToy {
  id: string;
  name: string;
  quantity: number;
  price: number;
  totalCost: number;
  description: string;
  categoryId: string;

  constructor(params: Partial<IToy>) {
    this.id = params.id || '';
    this.name = params.name || '';
    this.quantity = params.quantity || 0;
    this.price = params.price || 0;
    this.totalCost = params.totalCost || 0;
    this.description = params.description || '';
    this.categoryId = params.categoryId || '';
  }

  static create(params: Partial<IToy>): ToyEntity {
    return new ToyEntity({ ...params,  id: uuidv4() });
  }
}
