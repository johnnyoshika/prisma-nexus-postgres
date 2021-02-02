import { Express } from 'express';
import { PrismaClient } from '@prisma/client';
const getRandomInt = (max: number) =>
  Math.floor(Math.random() * Math.floor(max));

const prisma = new PrismaClient({ log: ['query'] });

export default (app: Express) => {
  app.get('/', (req, res) => {
    res.json({
      message: 'Hello!',
      env: process.env.SOME_ENV_VARIABLE,
    });
  });

  app.get('/seed', (req, res) => {
    (async function main() {
      await prisma.post.create({
        data: {
          title: 'Connecting to Admin',
          categories: {
            create: { category: { connect: { id: 1 } } },
          },
        },
      });

      await prisma.user.create({
        data: {
          name: 'John',
          email: `john+${getRandomInt(100000)}@prisma.io`,
          posts: {
            create: [
              {
                title: 'Mammals of the world!!!',
                categories: {
                  create: [
                    {
                      category: {
                        create: {
                          name: 'Mammal',
                        },
                      },
                    },
                    { category: { connect: { id: 4 } } },
                  ],
                },
              },
            ],
          },
          profile: {
            create: { bio: 'I like turtles' },
          },
        },
      });

      const users = await prisma.user.findMany({
        include: {
          posts: true,
          profile: true,
        },
      });
      console.log(users);
    })();

    res.send('Seeded!!!');
  });
};
