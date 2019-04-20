# 06 – Queries

## Task 1 – Query for the current user in the `components/App` component

```js
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
```

```js
const currentUserQuery = gql`
  query getCurrentUser {
    me {
      id
      username
      displayName
      photo
    }
  }
`;
```

```js
<Query query={currentUser}>
  {({ data, loading, error }) => {
    // TODO: Return error if there's an error
    //
    // return ...
  }}
</Query>
```

> 💡 Check for GraphQL request in the Network tab of your Chrome Devtools.

## Task 2 – Query tweets in the `pages/Home` component

```js
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { allTweetsQuery } from '../queries';
```

```js
<Query query={allTweetsQuery}>
  {({ data, loading: tweetsLoading, error }) => {
    // TODO: Render the `Loading` component when still loading
    // TODO: Return error if there's an error
    //
    // return ...
  }}
</Query>
```

## Task 3 – Query user in the `pages/Profile` component

```js
<Query query={userQuery} variables={{ username }}>
  {({ data, loading: loadingUser, error }) => {
    // TODO: Render the `Loading` component when still loading
    // TODO: Return error if there's an error

    const { user } = data;

    // TODO: If there's no user, render the `NotFound` page and pass username prop

    const canEdit = me.id === user.id;

    // return ...
  }}
</Query>
```
