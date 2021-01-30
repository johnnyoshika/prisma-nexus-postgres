import { makeSchema } from 'nexus';
import { join } from 'path';
import * as types from './graphql';

// Need .ts TypeScript extensions in dev and .js JavaScript extensions
// once TypeScript is compiled in production

const ext = process.env.NODE_ENV === 'production' ? 'js' : 'ts';

export const schema = makeSchema({
  types,
  outputs: {
    typegen: join(__dirname, '..', `nexus-typegen.${ext}`),
    schema: join(__dirname, '..', 'schema.graphql'),
  },
  contextType: {
    module: join(__dirname, `./context.${ext}`),
    export: 'Context',
  },
});
