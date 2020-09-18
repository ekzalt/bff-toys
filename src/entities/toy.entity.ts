import { v4 as uuidv4 } from 'uuid';
import { IToy } from '../interfaces';

export class ToyEntity implements IToy {
  id: string;
  quantity: number;
  description: string;
  categoryId: string;

  constructor(params: Partial<IToy>) {
    this.id = params.id || '';
    this.quantity = params.quantity || 0;
    this.description = params.description || '';
    this.categoryId = params.categoryId || '';
  }

  static create(params: Partial<IToy>): ToyEntity {
    return new ToyEntity({ ...params,  id: uuidv4() });
  }
}
