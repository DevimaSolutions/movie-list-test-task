# Movie List Test Task

## How to run

Install packages

```sh
yarn
```

Initiate the project so it will be ready to start

_[(Make sure docker is running when executing the setup command)](./CONTRIBUTING.md)_

```sh
yarn setup
```

Start the app:

```sh
yarn dev
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `backend`: a [Nest.js](https://nestjs.com/) backend app
- `frontend`: a [Next.js](https://nextjs.org/) frontend app
- `api-client`: API client automatically generated from `backend`'s Swagger specs. It should be used to perform API calls from the `frontend` project
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

## Develop

Please see **[CONTRIBUTING.md](./CONTRIBUTING.md)** for a guide on how to run the project locally.

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
