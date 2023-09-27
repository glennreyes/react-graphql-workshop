# GraphQL for React developers

Welcome to the GraphQL workshop for React developers! ☀️

In this workshop, we'll be building a Twitter clone using GraphQL and React. We'll be using [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server) for the GraphQL server and [Apollo Client](https://www.apollographql.com/docs/react) for the React app.

- 🌱 Learn GraphQL basics
- 🥑 Build GraphQL queries & mutations
- 🥝 Get familiar with the GraphQL client
- 🍇 Implement queries & mutations on the client
- 🔑 Access control & authorization
- 🎛 Production deployment

## 🔧 Setup

1. Get started by cloning this repo and installing the dependencies:

```sh
git clone https://github.com/glennreyes/react-graphql-workshop.git
cd react-graphql-workshop
pnpm install
```

2. Start the development servers:

```sh
pnpm dev
```

3. Open GraphiQL at http://localhost:4000/graphql and the React app at http://localhost:3000.

## 📚 Exercises

### Learn GraphQL basics

- GraphiQL
- Schema
- Types
- Resolvers

Create a query `hello` that takes an argument `name`. Based on what the user inputs, return a greeting. For example, if the user inputs `Glenn`, return `Hello Glenn!`.

> #### Useful links
>
> - https://the-guild.dev/graphql/yoga-server/docs
> - https://graphql.org/learn
>
> #### Default types
>
> - `String`
> - `Int`
> - `Float`
> - `Boolean`
> - `ID`
>
> #### Schema definition example
>
> ```graphql
> type Person {
>   id: ID! # Not nullable
>   name: String # Nullable
>   age: Int
>   weight: Float
>   isOnline: Boolean
>   posts: [Post!]! # Not nullable (but empty list is fine)
> }
>
> type Post {
>   id: ID!
>   slug: String!
>   text: String!
> }
>
> type Query {
>   allPersons: [Person!]!
>   personById(id: ID!): Person
>   allPosts: [Post!]!
>   postBySlug(slug: String!): Post
> }
>
> type Mutation {
>   createPost(message: String!): Post!
> }
> ```

> #### Resolver function
>
> ```ts
> (parent, args, context, info) => result;
> ```

### Build GraphQL queries & mutations

#### Build queries

1. 💎 Implement `allPosts` query
2. 💎 Implement `me` query
3. 💎 Implement `user` query

#### Build mutations

1. 💎 Implement `createPost` mutation
2. 💎 Implement `deletePost` mutation
3. 💎 Implement `updateUser` mutation

> #### Useful links
>
> Query & mutation field:
>
> - https://pothos-graphql.dev/docs/guide/queries-and-mutations
> - https://pothos-graphql.dev/docs/api/schema-builder#queryfieldname-field
> - https://pothos-graphql.dev/docs/api/schema-builder#mutationfieldname-field
>
> #### Prisma
>
> Make sure you're in the `server` directory:
>
> ```sh
> pnpm prisma migrate reset --skip-generate # Reset database
> pnpm prisma db push # Push prisma schema to database
> pnpm prisma generate # Generate Prisma client
> pnpm seed # Seed database with fake data
> ```

### Get familiar with the GraphQL client

- https://github.com/apollographql/apollo-client-nextjs

### Implement queries & mutations on the client

#### Queries

1. Implement query in `user-avatar.tsx`
2. Implement query in `home-feed.tsx`
3. Implement queries in `profile-page.tsx`
4. Implement query in `edit-profile.tsx`

> Use `useSuspenseQuery` from `@apollo/experimental-nextjs-app-support/ssr` to fetch data on the server.
>
> - https://github.com/apollographql/apollo-client-nextjs#in-ssr

#### Mutations

1. Implement mutation in `create-post-form.tsx`
2. Implement mutation in `delete-post-dialog.tsx`
3. Implement mutation in `edit-profile.tsx`

> Use `useMutation` from `@apollo/client`
>
> - https://www.apollographql.com/docs/react/data/mutations
