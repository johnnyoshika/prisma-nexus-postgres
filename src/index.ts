import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import express from 'express';
const app = express();

const prisma = new PrismaClient();

const getRandomInt = (max: number) =>
  Math.floor(Math.random() * Math.floor(max));

app.get('/', (req, res) => {
  (async function main() {
    await prisma.user.create({
      data: {
        name: 'John',
        email: `john+${getRandomInt(100000)}@prisma.io`,
        posts: {
          create: [
            {
              title: 'Hello World',
              categories: { create: { name: 'Office' } },
            },
            {
              title: 'Another World',
              categories: {
                create: [
                  {
                    name: 'Playground',
                  },
                  {
                    name: 'Wonder',
                  },
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

  res.send(
    `Hi, process.env.SOME_ENV_VARIABLE is ${process.env.SOME_ENV_VARIABLE}`,
  );
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
