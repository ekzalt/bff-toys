import {
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { IUser, ILoginResponse } from './interfaces';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard'
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private appService: AppService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request): Promise<ILoginResponse> {
    console.log('REQUEST AppController.login');
    const res = await this.authService.login(req.user as IUser);
    console.log('RESPONSE AppController.login', res);

    return res;
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Req() req: Request): Promise<void> {
    // TODO: invalidate jwt
    req.logout();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: Request): Promise<IUser> {
    console.log('REQUEST AppController.getProfile');
    console.log('RESPONSE AppController.getProfile', req.user);

    return req.user as IUser;
  }

  @Get()
  async getHello(): Promise<string> {
    console.log('REQUEST AppController.getHello');
    const res = this.appService.getHello();
    console.log('RESPONSE AppController.getHello', res);

    return res;
  }
}
