import { ApolloServer } from 'apollo-server-express';
import { schema } from 'api/schema';
import { context } from 'api/context';

export const server = new ApolloServer({ schema, context });
