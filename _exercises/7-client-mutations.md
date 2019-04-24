# 7 – Mutations in React

## Task 1 – Create tweet mutation

```js
<Mutation
  mutation={createTweetMutation}
  variables={{ tweet, from: me.username }}
  refetchQueries={[
    { query: allTweetsQuery },
    { query: userQuery, variables: { username: me.username } },
  ]}
  awaitRefetchQueries
>
  {mutate => {
    // TODO: do something with mutate();
  }}
</Mutation>
```

## Task 2 – Delete tweet mutation

## Task 3 – Update profile mutation
