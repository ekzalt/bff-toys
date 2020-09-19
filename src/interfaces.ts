// enum (domain)

export enum TxType {
  incoming = 'incoming',
  outcoming = 'outcoming',
}

// entity (infrastructure)

export interface IJwtPayload {
  sub: string;
}

// entity (domain)

export interface IUser {
  /** unique */
  id: string;
  /** unique */
  email: string;
  password: string;
}

export interface IToy {
  /** unique */
  id: string;
  name: string;
  quantity: number;
  price: number;
  totalCost: number;
  description: string;
  /** unique pair: `id + categoryId` */
  categoryId: string;
}

export interface ICategory {
  /** unique */
  id: string;
  /** unique */
  name: string;
}

// aggregate (domain)

export interface IToyAggregate {
  /** unique */
  id: string;
  name: string;
  quantity: number;
  price: number;
  totalCost: number;
  description: string;
  category: ICategory;
}

export interface ITxAggregate {
  /** unique */
  id: string;
  /** timestamp UTC */
  date: Date;
  userId: string;
  toys: IToyAggregate[];
  type: TxType;
}


// request

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ICategoryRequest {
  name: string;
}

export interface ITxRequest {
  toys: {
    id: string;
    quantity: number;
  }[];
  type: TxType;
}

// response

export interface ILoginResponse {
  accessToken: string;
}
