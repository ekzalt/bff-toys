import { Module } from '@nestjs/common';

import { MediatorModule } from '../mediator/mediator.module';
import { ToysController } from './toys.controller';

@Module({
  imports: [MediatorModule],
  controllers: [ToysController]
})
export class ToysModule {}
