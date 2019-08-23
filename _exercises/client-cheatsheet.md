# Client cheat sheet

## Client & Provider

```js
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: '[MY_GRAPHQL_ENDPOINT]',
  headers: {
    // ...
  },
});

<ApolloProvider client={client}>
  <App />
</ApolloProvider>;
```

## Query

```js
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const { data, loading, error } = useQuery(myQuery);
```

## Mutation

```js
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const [mutate] = useMutation(myMutation, {
  variables: {},
  onCompleted: data => {},
  refetchQueries: [{ query: queryToRefetch, variables: {} }],
  awaitRefetchQueries: true,
});
```
