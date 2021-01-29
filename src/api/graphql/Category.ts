import { objectType } from 'nexus';

export const Category = objectType({
  name: 'Category',
  definition(t) {
    t.nonNull.int('id');
    t.string('name');
  },
});
