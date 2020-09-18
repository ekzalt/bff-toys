import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import {
  IUser,
  IJwtPayload,
  ILoginRequest,
  ILoginResponse,
} from '../interfaces';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async getUserFromLogin(request: ILoginRequest): Promise<IUser> {
    return this.usersService.findOneByLogin(request);
  }

  async getUserFromJwt(payload: IJwtPayload): Promise<IUser> {
    return this.usersService.findOneById(payload.sub);
  }

  async login(user: IUser): Promise<ILoginResponse> {
    const payload: IJwtPayload = { sub: user.id };

    return { accessToken: this.jwtService.sign(payload) };
  }
}
