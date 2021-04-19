# Nest with graphql and prisma boilerplate

### Specification

- [Nestjs](https://docs.nestjs.com/)
- [Typescript](https://www.typescriptlang.org/)
- [GraphQL](https://graphql.org/)
- [apollo-server](https://github.com/apollographql/apollo-server)
- [prisma](https://www.prisma.io/)
- [postgresQL](https://www.postgresql.org/)

### Setup environment

1. set .env.dev

   > `cp .env.sample .env.dev`

2. Add `DATABASE_URL` & `SECRET_KEY` to .env.dev

| Name         | default | required | description         |
| ------------ | ------- | -------- | ------------------- |
| DATABASE_URL |         | yes      | For connection pool |
| SECRET_KEY   |         | yes      | For jwtToken        |

### Project start

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

### User Rolsolver:

- me query
- signUp mutation
- signIn mutation
- updateProfile mutation

### Notes

- Entity class in each module must be sync with model in `schema.prisma`.
- Entities are for GraphQL and Models are for Prisma.
- You can make your own dto classes for resolvers.
- queries or mutations with `@UseGuards(AuthGuard)` decorator should be sent with jwt in headers
- you can get a token when executing `signIn mutaion`
