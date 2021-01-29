# Simple Prisma w/ Postgres

Tutorial: https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch-typescript-postgres

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
