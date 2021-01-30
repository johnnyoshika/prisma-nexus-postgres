# Sample Prisma and Nexus with Postgres

Tutorials:

- Prisma: https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch-typescript-postgres
- Nexus: https://nexusjs.org/docs/getting-started/tutorial/chapter-introduction

# Database Migration

- Update `schema.prisma`

## Add and apply migration:

```
npx prisma migrate dev --preview-feature
```

## Only add migration:

```
npx prisma migrate dev --create-only --preview-feature
```

Once ready, apply the migration:

```
npx prisma migrate dev --preview-feature
```

## Prisma Client

Every time the Prisma schema changes, manually invoke prisma generate to accomodate the changes in the Prisma Client API:

```
npx prisma generate
```

## Prisma Studio

```
npx prisma studio
```

## Migration in production

```
npx prisma migrate deploy --preview-feature
```

# Start

- `docker-compose up -d` (to start postgres)
- `npm run dev` (to start web application and auto-generate GraphQL TypeScript types via Nexus)

Note: `npm run dev` includes the `--transpile-only` flag, which tells ts-node-dev not to typecheck. This is necessary for Nexus to generate TypeScript types. To enable typecheck, use `npm start` instead. More info: https://nexusjs.org/docs/getting-started/tutorial/chapter-writing-your-first-schema/#reflection

# Start DB and Server in Container

- `docker-compose -f docker-compose.yml -f docker-compose.server.yml up -d`

# Deploy locally

- `npm run build`
- Mac / Linux: `NODE_PATH=dist/ NODE_ENV=staging node ./dist/index.js`
- Windows:
  - `$env:NODE_PATH="dist/"`
  - `$env:NODE_ENV="staging"`
  - `node ./dist/index.js`

_Prefer `staging` over `production` b/c GraphQL Playground is disabled in production._