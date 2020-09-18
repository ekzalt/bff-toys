import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../interfaces';

export class UserEntity implements IUser {
  id: string;
  email: string;
  password: string;

  constructor(params: Partial<IUser>) {
    this.id = params.id || '';
    this.email = params.email || '';
    this.password = params.password || '';
  }

  static create(params: Partial<IUser>): UserEntity {
    return new UserEntity({ ...params, id: uuidv4() });
  }
}
