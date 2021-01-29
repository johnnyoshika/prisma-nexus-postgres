import http from 'http';
import express from 'express';
import { server } from '../src/server';
import getPort, { makeRange } from 'get-port';
import { GraphQLClient } from 'graphql-request';

type TestContext = {
  client: GraphQLClient;
};

export function createTestContext(): TestContext {
  let ctx = {} as TestContext;
  const graphqlCtx = graphqlTestContext();

  beforeEach(async () => {
    const client = await graphqlCtx.before();
    Object.assign(ctx, {
      client,
    });
  });
  afterEach(async () => {
    await graphqlCtx.after();
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
      return new GraphQLClient(`http://localhost:${port}/graphql`);
    },
    async after() {
      serverInstance?.close();
    },
  };
}
