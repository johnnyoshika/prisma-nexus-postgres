import { Category, PrismaClient } from '@prisma/client';
import {
  extendType,
  intArg,
  list,
  nonNull,
  objectType,
  stringArg,
} from 'nexus';

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.nonNull.int('id');
    t.string('title');
    t.string('body');
    t.boolean('published');
    t.nonNull.list.field('categories', {
      type: 'Category',
      resolve: async (post, _args, ctx) =>
        ctx.db.category.findMany({
          where: {
            posts: {
              some: {
                postId: post.id,
              },
            },
          },
        }),
    });
  },
});

export const PostQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('drafts', {
      type: 'Post',
      resolve: (_root, _args, ctx) =>
        ctx.db.post.findMany({ where: { published: false } }),
    });

    t.list.field('posts', {
      type: 'Post',
      resolve: (_root, _args, ctx) =>
        ctx.db.post.findMany({ where: { published: true } }),
    });
  },
});

export const PostMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createDraft', {
      type: 'Post',
      args: {
        title: nonNull(stringArg()),
        body: nonNull(stringArg()),
        categories: list(nonNull(stringArg())),
      },
      resolve: async (_root, args, ctx) => {
        const categories = await ctx.db.category.findMany({
          where: {
            name: {
              in: args.categories ?? [],
            },
          },
        });

        return await ctx.db.post.create({
          data: {
            title: args.title,
            body: args.body,
            published: false,
            categories: {
              // All of these type declarations are here otherwise 'npm start' complains, even though 'npm run dev' doesn't
              create: (args.categories ?? [])
                .filter(
                  (n: string) =>
                    !categories.some((c: Category) => c.name == n),
                )
                .map(
                  (n: string) =>
                    ({
                      category: { create: { name: n } },
                    } as any),
                )
                .concat(
                  categories.map((c: Category) => ({
                    category: {
                      connect: {
                        id: c.id,
                      },
                    },
                  })) as any,
                ),
            },
          },
        });
      },
    });

    t.field('publish', {
      type: 'Post',
      args: {
        draftId: nonNull(intArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.db.post.update({
          where: { id: args.draftId },
          data: {
            published: true,
          },
        });
      },
    });
  },
});
