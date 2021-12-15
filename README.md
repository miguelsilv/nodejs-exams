# Descrição da arquitetura
Foi utilizado uma implementação baseada no clean architecture, com alguns padrões de repositories para dados fornecidos pelo `TypeORM`.

## Core

Camada de tratamento das regras de negocio da aplicação. Nela ficam as entidades, as abstrações de repository e casos de uso da aplicação.

Entities, representa uma tabela do banco.
Repository, abstração da obtenção de dados do sistema.
Use cases, regras de casos de uso da aplicação.

## Data

Onde ficam as implementações dos repositories, ou seja, de onde vem os dados. Nesse projeto tem duas formas de registrar/obter os dados. Por memoria ou pelo banco de dados `mysql`.

Para escolher qual deseja usar, basta ir no modulo de importação e alterar o `use-class` na parte de providers. exemplo:

```ts
  { provide: LaboratoryRepository, useClass: LaboratoryDataRepository, } // usando o banco de dados

  { provide: LaboratoryRepository, useClass: LaboratoryMockRepository, } // usando mocks e dados em cache
```

## Infra

Parte de infraestrutura da aplicação, configurações com banco de dados, autenticação, guards, pipes entre outras configurações gerais. Para esse projeto só consegui implementar a configuração de banco de dados por falta de tempo :(

## Presentation
Porta de entrada da aplicação, aqui ficam os controllers, e onde é exposto todos os dtos da aplicação.


## Shared
Parte compartilhada, pode conter models, dtos, enums entre outras partes exportadas por toda aplicação


# Descrição do nestjs
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

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

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
