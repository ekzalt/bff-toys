import { v4 as uuidv4 } from 'uuid';
import { ICategory } from '../interfaces';

export class CategoryEntity implements ICategory {
  id: string;
  name: string;

  constructor(params: Partial<ICategory>) {
    this.id = params.id || '';
    this.name = params.name || '';
  }

  static create(name: string): CategoryEntity {
    return new CategoryEntity({ name, id: uuidv4() });
  }
}
