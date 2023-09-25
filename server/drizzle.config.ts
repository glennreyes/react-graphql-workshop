import type { Config } from 'drizzle-kit';

export default {
  dbCredentials: {
    url: 'sqlite.db',
  },
  driver: 'better-sqlite',
  out: './drizzle',
  schema: './src/db/schema.ts',
} satisfies Config;
