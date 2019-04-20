# 05 – Setup Apollo Client

```js
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
```

```js
// Create an Apollo client
const client = new ApolloClient({
  uri: 'http://localhost:4000',
  headers: {
    authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZ2xubnJ5cyJ9.zWPZZQrX7SIrsEqnsLov4yTUWNmw-Fp95ueSt1J4f-A',
  },
});

// Wrap the Apollo Provider to your <App />
<ApolloProvider client={client} />;
```
