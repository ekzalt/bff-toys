import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';

import { TxType, ITxAggregate, ITxRequest } from '../interfaces';
import { CategoryEntity, ToyAggregate, TransactionAggregate } from '../entities';
import { MediatorService } from '../mediator/mediator.service';

@Injectable()
export class TransactionsService {
  private readonly txs: ITxAggregate[];

  constructor(private mediatorService: MediatorService) {
    this.txs = [
      new TransactionAggregate({
        id: '1',
        date: new Date(),
        userId: '1',
        toys: [
          new ToyAggregate({
            id: '1',
            quantity: 5,
            description: 'some toy',
            categoryId: '1',
          }, new CategoryEntity({
            id: '1',
            name: 'Hotwheels',
          })),
        ],
        type: TxType.incoming,
      }),
    ];
  }

  async findAll(): Promise<ITxAggregate[]> {
    return this.txs;
  }

  async findOneById(id: string): Promise<ITxAggregate> {
    const tx = this.txs.find(t => t.id === id);

    if (!tx) {
      throw new NotFoundException();
    }

    return tx;
  }

  async create(userId: string, tx: ITxRequest): Promise<ITxAggregate> {
    switch(tx.type) {
      case TxType.incoming: return this.createIncoming(userId, tx);
      case TxType.outcoming: return this.createOutcoming(userId, tx);
      default: throw new BadRequestException('Unsupported transaction type');
    }
  }

  async createIncoming(userId: string, tx: ITxRequest): Promise<ITxAggregate> {
    const promises = tx.toys.map(t => this.mediatorService
      .increaseToyQuantity(t.id, t.quantity)
      .then(toy => new ToyAggregate({
        id: toy.id,
        quantity: t.quantity, // quantity from ITxRequest toy
        description: toy.description,
        categoryId: toy.category.id,
      }, toy.category)));

    const toys = await Promise.all(promises);
    const entity = TransactionAggregate.create(userId, toys, tx.type);
    this.txs.push(entity);

    return entity;
  }

  async createOutcoming(userId: string, tx: ITxRequest): Promise<ITxAggregate> {
    const promises = tx.toys.map(t => this.mediatorService
      .decreaseToyQuantity(t.id, t.quantity)
      .then(toy => new ToyAggregate({
        id: toy.id,
        quantity: t.quantity, // quantity from ITxRequest toy
        description: toy.description,
        categoryId: toy.category.id,
      }, toy.category)));

    const toys = await Promise.all(promises);
    const entity = TransactionAggregate.create(userId, toys, tx.type);
    this.txs.push(entity);

    return entity;
  }
}
