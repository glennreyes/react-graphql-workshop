# 02 – Create queries for `User` and `Tweet`

## Task 1 – Add schema type definitions

### `User`

- `id` – Returns always an `ID`
- `createdAt` – Returns always a `String`
- `username` – Returns always a `String`
- `displayName` – Returns `String` or null
- `bio` – Returns `String` or null
- `email` – Returns `String` or null
- `photo` – Returns `String` or null
- `tweets` – Returns a list of `Tweet`s

### `Tweet`

- `id` – Returns always an `ID`
- `createdAt` – Returns always a `String`
- `tweet` – Returns always a `String`
- `from` – Returns always a `User`

### `Query`

- `user` – takes `username` as a required `String` and returns a `User` or null
- `users` – Returns always a list of `User`s
- `tweet` – takes `id` as a required `ID` and returns a `Tweet` or null
- `tweets` – Returns a list of `Tweets`

> 💡 Check out the [sample types](server-cheatsheet.md#sample-types) in the server cheat sheet to find out how to write _nullable_ and _non-nullable_ types.

## Task 2 – Add resolvers

### Add resolvers for `Query` fields

- `tweet`
- `tweets`
- `users`
- `user`

You will need following from the database (`./db/tweets.js` & `./db/users.js`):

- `getAllUsers`
- `getAllTweets`
- `getTweetById`

> ⚙️ Run `yarn add cuid` to install the missing dependency.

> 💡 The [sample resolver](server-cheatsheet.md#sample-resolver) in the server cheat sheet will be your friend.

### `User` & `Tweet`

Go find out 😎

## Task 3 – Test queries

Here are some queries you may want to verify that they resolve all query fields as you would expect. Use GraphQL Playground for that. The goal in this exercise is to make sure that all of these queries work as expected.

> 💡 Open the docs by clicking the green _SCHEMA_ flap on the right.

### Simple

```graphql
{
  users {
    id
    createdAt
    username
    displayName
    bio
    email
    photo
  }
}
```

```graphql
{
  tweets {
    id
    createdAt
    tweet
  }
}
```

### Nested

```graphql
{
  users {
    id
    createdAt
    username
    displayName
    bio
    email
    photo
    tweets {
      id
      tweet
    }
  }
}
```

```graphql
{
  tweets {
    id
    createdAt
    tweet
    from {
      id
      username
      displayName
    }
  }
}
```

### With param

```graphql
{
  user(username: "glnnrys") {
    id
    username
    displayName
    bio
    email
    createdAt
    tweets {
      id
      tweet
    }
  }
}
```

```graphql
{
  tweet(id: "2") {
    id
    tweet
  }
}
```

### With query variables

```graphql
query getUserByUsername($username: String!) {
  user(username: $username) {
    id
    username
    displayName
    bio
    email
    createdAt
    tweets {
      id
      tweet
    }
  }
}
```

```json
{
  "username": "glnnrys"
}
```

```graphql
query getTweetById($id: ID!) {
  tweet(id: $id) {
    id
    tweet
  }
}
```

```json
{
  "id": "2"
}
```
