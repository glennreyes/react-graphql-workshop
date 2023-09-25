import { eq } from 'drizzle-orm';
import { db } from './index';
import { posts, users } from './schema';

(async () => {
  console.info('Start seeding...');

  // Seed users
  await db.insert(users).values([
    {
      bio: 'Software Engineer, Tech Speaker & Workshop Instructor · Head of Developer Relations @kadena_io · 🤍 Doing everything that makes me feel alive',
      createdAt: new Date('December 1, 2008').toISOString(),
      displayName: 'Glenn Reyes',
      email: 'glenn@glennreyes.com',
      photo: 'https://github.com/glennreyes.png',
      username: 'glnnrys',
    },
    {
      bio: `5% of the @ReactAlicante organization. co-founder @limenius.com Jeder für sich und Gott gegen alle.`,
      createdAt: new Date('July 1, 2009').toISOString(),
      displayName: 'Nacho Martin',
      email: 'nacho@gmail.com',
      photo: 'https://github.com/nacmartin.png',
      username: 'nacmartin',
    },
    {
      bio: `Telecom engineer, Philosophy student, founder at Limenius. Coding is fun, building stuff double fun. Playing football makes you happy. @limenius @ReactAlicante`,
      createdAt: new Date('December 1, 2008').toISOString(),
      displayName: 'Victoria Quirante',
      email: 'victoria@gmail.com',
      photo: 'https://github.com/VictoriaQ.png',
      username: 'vicqr',
    },
  ]);

  const glnnrys = (await db.select({ id: users.id }).from(users).where(eq(users.username, 'glnnrys')))[0];
  const nacmartin = (await db.select({ id: users.id }).from(users).where(eq(users.username, 'nacmartin')))[0];
  const vicqr = (await db.select({ id: users.id }).from(users).where(eq(users.username, 'vicqr')))[0];

  // Seed posts

  await db.insert(posts).values([
    {
      authorId: glnnrys.id,
      createdAt: new Date('Sep 9, 2019').toISOString(),
      message: 'Hola! This is my first message.',
    },
    {
      authorId: nacmartin.id,
      createdAt: new Date('Sep 25, 2019').toISOString(),
      message: 'Buenos dias Alicante!',
    },
    {
      authorId: vicqr.id,
      createdAt: new Date('Sep 26, 2019').toISOString(),
      message: 'No puedo esperar para la conferencia @ReactAlicante mañana!',
    },
    {
      authorId: glnnrys.id,
      createdAt: new Date('Sep 26, 2019').toISOString(),
      message: 'So many people attending this workshop at @ReactAlicante!',
    },
  ]);

  console.info('Seeding completed!');
})();
