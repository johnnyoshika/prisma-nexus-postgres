import http from 'http';
import express from 'express';
import { server } from '../src/server';
import getPort, { makeRange } from 'get-port';
import { GraphQLClient } from 'graphql-request';
import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import { nanoid } from 'nanoid';
import { join } from 'path';
import { Client } from 'pg';
import { db } from '../src/api/db';

type TestContext = {
  client: GraphQLClient;
  db: PrismaClient;
};

export function createTestContext(): TestContext {
  let ctx = {} as TestContext;
  const graphqlCtx = graphqlTestContext();
  const prismaCtx = prismaTestContext();

  beforeEach(async () => {
    const client = await graphqlCtx.before();
    const db = await prismaCtx.before();

    Object.assign(ctx, {
      client,
      db,
    });
  });
  afterEach(async () => {
    await graphqlCtx.after();
    await prismaCtx.after();
  });
  return ctx;
}

function graphqlTestContext() {
  let serverInstance: http.Server | null = null;
  return {
    async before() {
      const port = await getPort({ port: makeRange(4000, 6000) });
      const app = express();
      server.applyMiddleware({ app, path: '/graphql' });
      serverInstance = app.listen(port);

      serverInstance.on('close', async () => {
        db.$disconnect();
      });

      return new GraphQLClient(`http://localhost:${port}/graphql`);
    },
    async after() {
      serverInstance?.close();
    },
  };
}

function prismaTestContext() {
  const prismaBinary = join(
    __dirname,
    '..',
    'node_modules',
    '.bin',
    'prisma',
  );
  let schema = '';
  let databaseUrl = '';
  let prismaClient: null | PrismaClient = null;
  return {
    async before() {
      // Generate a unique schema identifier for this test context
      schema = `test_${nanoid()}`;
      // Generate the pg connection string for the test schema
      databaseUrl = `postgres://admin:password@localhost:5440/testing?schema=${schema}`;
      // Set the required environment variable to contain the connection string
      // to our database test schema
      process.env.DATABASE_URL = databaseUrl;
      // Run the migrations to ensure our schema has the required structure
      execSync(`${prismaBinary} db push --preview-feature`, {
        env: {
          ...process.env,
          DATABASE_URL: databaseUrl,
        },
      });
      // Construct a new Prisma Client connected to the generated Postgres schema
      prismaClient = new PrismaClient();
      return prismaClient;
    },
    async after() {
      // Drop the schema after the tests have completed
      const client = new Client({
        connectionString: databaseUrl,
      });
      await client.connect();
      await client.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
      await client.end();
      // Release the Prisma Client connection
      await prismaClient?.$disconnect();
    },
  };
}
