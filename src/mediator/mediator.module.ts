import { Module } from '@nestjs/common';

import { CategoriesService } from './categories.service';
import { ToysService } from './toys.service';
import { MediatorService } from './mediator.service';

@Module({
  providers: [
    CategoriesService,
    ToysService,
    MediatorService,
  ],
  exports: [MediatorService],
})
export class MediatorModule {}
