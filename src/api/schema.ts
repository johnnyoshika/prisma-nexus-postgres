import { makeSchema } from 'nexus';
import { join } from 'path';
import * as types from './graphql';

export const schema = makeSchema({
  types,
  outputs: {
    typegen: join(__dirname, '..', 'nexus-typegen.ts'), // This needs to be .js extension once TypeScript is compiled to JS
    schema: join(__dirname, '..', 'schema.graphql'),
  },
  contextType: {
    module: join(__dirname, './context.ts'), // This needs to be .js extension once TypeScript is compiled to JS
    export: 'Context',
  },
});
