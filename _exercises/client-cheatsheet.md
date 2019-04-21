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
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

<Query query={myQuery}>
  {({ data, loading, error }) => {
    // ...
  }}
</Query>;
```

## Mutation

```js
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

<Mutation
  mutation={myMutation}
  variables={{}}
  onCompleted={data => {}}
  refetchQueries={[{ query: queryToRefetch, variables: {} }]}
  awaitRefetchQueries
>
  {mutate => (
    // ...
  )}
</Mutation>;
```
