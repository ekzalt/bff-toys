import { Injectable, NotFoundException } from '@nestjs/common';

import { IUser, ILoginRequest } from '../interfaces';
import { UserEntity } from '../entities';

@Injectable()
export class UsersService {
  private readonly users: IUser[];

  constructor() {
    this.users = [
      new UserEntity({
        id: '1',
        email: 'user@example.com',
        password: '1234567890', // TODO: hash password here
      }),
    ];
  }

  async findOneById(id: string): Promise<IUser> {
    const user = this.users.find(u => u.id === id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async findOneByLogin(request: ILoginRequest): Promise<IUser> {
    // TODO: hash password here
    const hash = request.password;
  
    return this.users.find(u => (u.email === request.email && u.password === hash));
  }
}
