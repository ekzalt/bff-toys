import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { MediatorModule } from './mediator/mediator.module';
import { ToysModule } from './toys/toys.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [AuthModule, UsersModule, CategoriesModule, MediatorModule, ToysModule, TransactionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
