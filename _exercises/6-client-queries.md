# 6 – Queries in React

## Task 1 – Query for the current user in the `components/App` component

```js
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
```

```js
const currentUserQuery = gql`
  query getCurrentUser {
    # TODO
  }
`;
```

```js
const { data, loading, error } = useQuery(currentUserQuery);

// TODO: Return error if there's an error
//
// return ...
```

> 💡 Check for GraphQL request in the Network tab of your Chrome Devtools.

## Task 2 – Query for tweets in the `pages/Home` component

```js
import { allTweetsQuery } from '../queries';
```

```js
const { data, loading, error } = useQuery(allTweetsQuery);

// TODO: Render the `Loading` component when still loading
// TODO: Return error if there's an error
//
// return ...
```

## Task 3 – Query for user in the `pages/Profile` component

```js
const { data, loading, error } = useQuery(allTweetsQuery, {
  variables: {
    /* TODO */
  },
});

// TODO: Render the `Loading` component when still loading
// TODO: Return error if there's an error

// TODO: If there's no user, render the `NotFound` page and pass username prop
// return ...
```

> 💡 We want to pass username as a variable.
