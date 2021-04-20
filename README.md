# Nest with graphql and prisma boilerplate

## Specification

- [Nestjs](https://docs.nestjs.com/)
- [Typescript](https://www.typescriptlang.org/)
- [GraphQL](https://graphql.org/)
- [apollo-server](https://github.com/apollographql/apollo-server)
- [prisma](https://www.prisma.io/)
- [postgresQL](https://www.postgresql.org/)

## Repo structure

The directory structure is:

```
app/
├─ dist
├─ node_modules/
├─ prisma
│  └─ migrations                           - prisma schema migration history
│  └─ schema.prisma                        - Main configuration file for your Prisma setup(db connection, prisma models, prisma client)
├─ src/                                    - Main source code folder
│  └─ auth                                 - Authentication with `authUser` decorator and `Authguard`
│  └─ common                               - common folder for reusable components like dtos & utils etc..
│  └─ jwt
│     └─ jwt.interfaces.ts                 - Interface for forRoot parameter.  Argument needed is injected in `app.module.ts` file.
│     └─ jwt.middleware.ts                 - Decoding incoming token if request has token in headers and Inject user info extracted from token to request object.
│     └─ jwt.module.ts                     - A JwtModule is dynamic module. so It can be created with cusmtom dependencies.
│     └─ jwt.service.ts                    - Generate token and verify token
│  └─ prisma                               - A PrismaService is inherited from PrismaClient. This folder does not have any relations with prisma folder outside.
│  └─ user                                 - An UserModule has basic resovlers that can be used commonly.
│     └─ dtos                              - A Dto class is for `graphql`. you can define your own dto class for each resolver.
│     └─ entities                          - An Entity class is also for `graphql`. because user type from prisma client is just type, so you need object to treat `graphql` object. It must be sync with models in `schema.prisma`.
│     └─ user.module.ts                    - An UserModule entry class. It can import other modules or dependencies also export own dependencies.
│     └─ user.resolver.ts                  - A ResolverClass works like controller in MVC architecture. It can distribute incoming queries or mutaions from client to each resolver.
│     └─ user.service.ts                   - ServiceClass has responsibility about buissness logic. I recommend that All possible errors are handled here.
│  └─ app.module.ts                        - An AppModule is main entry module for while modules in this project.
│  └─ main.ts                              - This is entry file like `index.js` in js project.
├─ test/                                   - For E2E test
├─ .env.sample                             - A Sample for .env file. you should copy this to .env depends on your environment.
├─ .eslintrc.js
├─ .gitignore
├─ .prettierrc
├─ nest-cli.json
├─ package.json
├─ README.md
├─ tsconfig.json
├─ tsconfig.build.json
└─ yarn.lock
```

## Setup environment

1. set .env.dev

   > `cp .env.sample .env.dev`

2. Add `DATABASE_URL` & `SECRET_KEY` to .env.dev

| Name         | default | required | description         |
| ------------ | ------- | -------- | ------------------- |
| DATABASE_URL |         | yes      | For connection pool |
| SECRET_KEY   |         | yes      | For jwtToken        |

## Project start

### I recommend to you install nest and typescript globally before start this proejct.

```
yarn global add typescript @nestjs/cli
```

1. Install Dependencies

```
yarn

```

2. Start server

```sh
yarn run start:dev
```

3. Generate Prisma Client

```sh
yarn generate
```

4. Migrate for sync your models in`schema.prisma` with your db

```sh
yarn run migrate:dev
```

Note : If you have following errors, I recommend you to use node version 12 or 14

```
Cannot find module '@apollo/gateway' or its corresponding type declarations.
```

```sh
nvm use 12
```

## To make your own module

If typing `nest` command in your terminal, you can see a many options like below.

- examples

```sh
- nest g mo <moduleName> : Create new module. this command can add new module to app module automatically.
```

## Test

Nest project gives us ready-made testing facilities. Each module can have tset file ends with `.spec.ts`. and E2E test folder.

```sh
- yarn run test:watch
```

## Basic Module

#### User Module:

- me query
- signUp mutation
- signIn mutation
- updateProfile mutation
- changePassword mutation

#### Jwt Module:

- sign
- verify

#### Common Module:

- Common reusable components

#### Auth Module:

- Auth decorator and AuthGuard for verify right user.

#### Prisma Module:

- Prisma module is Inherited from prisma client.

## Notes

- Entities are for GraphQL and Models are for Prisma.
- Fields in Entity class must be sync with model in `schema.prisma`.
- You can make your own dto classes for resolvers.
- queries or mutations with `@UseGuards(AuthGuard)` decorator should be sent with jwt in headers
- you can get a token when executing `signIn mutaion`
