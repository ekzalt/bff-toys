import {
  Controller,
  Param,
  Req,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { IUser, ITxRequest, ITxAggregate } from '../interfaces';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req: Request): Promise<ITxAggregate> {
    console.log('REQUEST TransactionsController.create', req.body);
    const user = req.user as IUser;
    const res = await this.transactionsService.create(user.id, req.body as ITxRequest);
    console.log('RESPONSE TransactionsController.create', res);

    return res;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<{ transactions: ITxAggregate[] }> {
    console.log('REQUEST TransactionsController.findAll');
    const transactions = await this.transactionsService.findAll();
    console.log('RESPONSE TransactionsController.findAll', { transactions });

    return { transactions };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<ITxAggregate> {
    console.log('REQUEST TransactionsController.findOneById', id);
    const res = await this.transactionsService.findOneById(id);
    console.log('RESPONSE TransactionsController.findOneById', res);

    return res;
  }
}
