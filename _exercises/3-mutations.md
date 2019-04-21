# 3 – Create mutations for `User` and `Tweet`

## Task 1 – Add fields to the `Mutation` type

- `createTweet`
  - Takes `tweet`, `from`
  - Returns `Tweet`
- `deleteTweet`
  - Takes `id`
  - Returns `Tweet`
- `createUser`
  - Takes `username`, `displayName`, `bio`, `photo`
  - Returns `User`
- `updateUser`
  - Same as createUser
- `deleteUser`
  - Takes `id`
  - Returns `User`

💡 Use appropriate types for the field arguments and determine if the type can be nullable or not!

## Task 2 - Add resolvers

- Create all other resolvers for each mutation
- Check the database API (`./db/users.js` & `./db/tweets.js`) for all relevant functions

## Task 3 – Test mutations

### Sample mutation

```graphql
mutation {
  createTweet(from: "glnnrys", tweet: "Whatever") {
    id
    tweet
  }
}
```

### With variables

```graphql
mutation createTweet($from: String!, $tweet: String!) {
  createTweet(from: $from, tweet: $tweet) {
    id
    tweet
  }
}
```

```json
{
  "from": "glnnrys",
  "tweet": "Whatever"
}
```
