# magnifi-partner-service

## Steps to create the project

```bash
$ nest new magnifi-partner-service
$ cd magnifi-partner-service
$ yarn add @nestjs/platform-fastify
$ yarn add @nestjs/typeorm typeorm pg
$ yarn add --dev prettier eslint-config-prettier eslint-plugin-prettier
$ yarn add @nestjs/config
$ yarn add joi winston @types/winston
$ yarn add class-validator class-transformer
$ nest generate module common [To create a common module]

```

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
