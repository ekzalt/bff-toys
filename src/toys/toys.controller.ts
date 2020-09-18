import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { IToy, IToyAggregate } from '../interfaces';
import { MediatorService } from '../mediator/mediator.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('toys')
export class ToysController {
  constructor(private mediatorService: MediatorService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: Partial<IToy>): Promise<IToyAggregate> {
    console.log('REQUEST ToysController.create', body);
    const res = await this.mediatorService.createToy(body);
    console.log('RESPONSE ToysController.create', res);

    return res;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<{ toys: IToyAggregate[] }> {
    console.log('REQUEST ToysController.findAll');
    const toys = await this.mediatorService.findToys();
    console.log('RESPONSE ToysController.findAll', { toys });

    return { toys };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<IToyAggregate> {
    console.log('REQUEST ToysController.findOneById', id);
    const res = await this.mediatorService.findToyById(id);
    console.log('RESPONSE ToysController.findOneById', res);

    return res;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async replace(@Param('id') id: string, @Body() body: IToy): Promise<IToyAggregate> {
    console.log('REQUEST ToysController.replace', id, body);
    const res = await this.mediatorService.replaceToy(id, body);
    console.log('RESPONSE ToysController.replace', res);

    return res;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: Partial<IToy>): Promise<IToyAggregate> {
    console.log('REQUEST ToysController.update', id, body);
    const res = await this.mediatorService.updateToy(id, body);
    console.log('RESPONSE ToysController.update', res);

    return res;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<IToyAggregate> {
    console.log('REQUEST ToysController.delete', id);
    const res = await this.mediatorService.deleteToy(id);
    console.log('RESPONSE ToysController.delete', res);

    return res;
  }
}
