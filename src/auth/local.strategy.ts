import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { IUser, ILoginRequest } from '../interfaces';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string): Promise<IUser> {
    const request: ILoginRequest = { email: username, password };
    const user = await this.authService.getUserFromLogin(request);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
