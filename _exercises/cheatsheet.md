# Useful snippets

## Default types

- `Int`
- `Float`
- `String`
- `Boolean`
- `ID`

## Sample types

```graphql
type Person {
  id: ID! # Not nullable
  name: String # Nullable
  age: Int
  weight: Float
  isOnline: Boolean
  posts: [Post!]! # Not nullable (but empty list is fine)
}

type Post {
  id: ID!
  slug: String!
  heading: String!
  text: String!
}

type Query {
  allPersons: [Person!]!
  personById(id: ID!): Person
  allPosts: [Post!]!
  postBySlug(slug: String!): Post
}
```

## Resolver signature

```js
(obj, args, context, info) => result;
```

## Sample resolver

```js
const resolvers = {
  Query: {
    personById: (obj, args) => API.getPersonById(args.id),
  },
};
```
