import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import { PrismaClient } from '@prisma/client';
import type { Context } from './index';

const prisma = new PrismaClient({});

export const builder = new SchemaBuilder<{
  Context: Context;
  PrismaTypes: PrismaTypes;
  Scalars: { DateTime: { Input: Date; Output: Date } };
}>({
  plugins: [PrismaPlugin],
  prisma: { client: prisma },
});
