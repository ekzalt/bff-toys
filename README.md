## Description API

App starts on `http://localhost:8080`.

Please see `src/interfaces.ts` file with types!

### General

- **/login, POST** - expects **ILoginRequest** `{"email":"user@example.com","password":"1234567890"}`, returns **ILoginResponse** with auth token (24h access). Put it in `Authorization` header like `Bearer your.token.here`.
- **/profile, GET** - returns **IUser**, check that `Authorization` works.

### Categories

- **/categories, POST** - expects **ICategoryRequest**, returns **ICategory**.
- **/categories, GET** - returns **ICategory** list.
- **/categories/:id, GET** - returns **ICategory**.
- **/categories/:id, PUT** -  expects **ICategoryRequest**, returns **ICategory**.
- **/categories/:id, DELETE** - returns **ICategory**.

### Toys

- **/toys, POST** - expects **IToy**, returns **IToyAggregate**.
- **/toys, GET** - returns **IToyAggregate** list.
- **/toys/:id, GET** - returns **IToyAggregate**.
- **/toys/:id, PUT** -  expects **IToy**, returns **IToyAggregate** (full replace).
- **/toys/:id, PATCH** -  expects **IToy**, returns **IToyAggregate** (partial update with merge).
- **/toys/:id, DELETE** - returns **IToyAggregate**.

### Transactions

- **/transactions, POST** - expects **ITxRequest**, returns **ITxAggregate**.
- **/transactions, GET** - returns **ITxAggregate** list.
- **/transactions/:id, GET** - returns **ITxAggregate**.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
