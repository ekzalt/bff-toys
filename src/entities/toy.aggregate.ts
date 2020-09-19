import { IToy, IToyAggregate, ICategory } from '../interfaces';

export class ToyAggregate implements IToyAggregate {
  id: string;
  name: string;
  quantity: number;
  price: number;
  totalCost: number;
  description: string;
  category: ICategory;

  constructor(toy: IToy, category: ICategory) {
    this.id = toy.id || '';
    this.name = toy.name || '';
    this.quantity = toy.quantity || 0;
    this.price = toy.price || 0;
    this.totalCost = toy.totalCost || 0;
    this.description = toy.description || '';
    this.category = category || null;
  }
}
