import { ApolloServer } from 'apollo-server-express';
import { schema } from 'api/schema';

export const server = new ApolloServer({ schema });
