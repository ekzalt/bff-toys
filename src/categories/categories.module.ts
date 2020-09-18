import { Module } from '@nestjs/common';

import { MediatorModule } from '../mediator/mediator.module';
import { CategoriesController } from './categories.controller';

@Module({
  imports: [MediatorModule],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
