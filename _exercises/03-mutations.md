# 03 – Create mutations for `User` and `Tweet`

## Step 1 – Add fields to the `Mutation` type

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
