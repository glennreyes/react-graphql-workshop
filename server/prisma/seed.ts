import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async () => {
  console.info('Start seeding...');

  // Seed users
  await Promise.all(
    Array.from({ length: 5 }, async () => {
      await prisma.user.create({
        data: {
          bio: faker.person.bio(),
          displayName: faker.person.fullName(),
          email: faker.internet.email(),
          photo: faker.internet.avatar(),
          username: faker.internet.userName(),
        },
      });
    }),
  );

  // Seed posts
  await Promise.all(
    Array.from({ length: 20 }, async () => {
      const index = faker.number.int({ max: 5, min: 1 });
      const user = await prisma.user.findFirstOrThrow({ skip: index - 1 });

      await prisma.post.create({
        data: {
          message: faker.lorem.sentence(),
          userId: user.id,
        },
      });
    }),
  );

  console.info('Seeding completed!');
})();
