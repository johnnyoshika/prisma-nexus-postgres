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

## Migration in production

```
npx prisma migrate deploy --preview-feature
```

# Start

- `docker-compose up -d` (to start postgres)
- `npm start` (to start web application)
