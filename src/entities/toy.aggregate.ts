import { IToy, IToyAggregate, ICategory } from '../interfaces';

export class ToyAggregate implements IToyAggregate {
  id: string;
  quantity: number;
  description: string;
  category: ICategory;

  constructor(toy: IToy, category: ICategory) {
    this.id = toy.id || '';
    this.quantity = toy.quantity || 0;
    this.description = toy.description || '';
    this.category = category || null;
  }
}
