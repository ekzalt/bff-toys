import { v4 as uuidv4 } from 'uuid';

import { TxType, ITxAggregate, IToyAggregate } from '../interfaces';

export class TransactionAggregate implements ITxAggregate {
  id: string;
  date: Date;
  userId: string;
  toys: IToyAggregate[];
  type: TxType;

  constructor(tx: ITxAggregate) {
    this.id = tx.id || '';
    this.date = tx.date || null;
    this.userId = tx.userId || '';
    this.toys = tx.toys || [];
    this.type = tx.type || TxType.incoming;
  }

  static create(userId: string, toys: IToyAggregate[], type: TxType): TransactionAggregate {
    return new TransactionAggregate({
      id: uuidv4(),
      date: new Date(),
      userId,
      toys,
      type,
    });
  }
}
