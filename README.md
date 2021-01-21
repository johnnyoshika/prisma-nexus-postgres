# Simple Prisma w/ Postgres

Tutorial: https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch-typescript-postgres

# Add migration

- Update `schema.prisma`
- Add migration and run migration against database with:

```
npx prisma migrate dev --name init --preview-feature
```

# Start

- `docker-compose up -d` (to start postgres)
- `npm start` (to start web application)
