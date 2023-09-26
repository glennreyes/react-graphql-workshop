import './post';
import './user';
import { GraphQLDateTime } from 'graphql-scalars';
import { builder } from '../builder';

builder.mutationType({});
builder.queryType({});
builder.addScalarType('DateTime', GraphQLDateTime, {});

export const schema = builder.toSchema();
