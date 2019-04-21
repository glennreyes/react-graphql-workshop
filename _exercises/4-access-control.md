# 4 – Access control & Authorization

Let's simulate that we're logged in as _glnnrys_ and we're receiving following JWT token in the _Authorization_ header:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZ2xubnJ5cyJ9.zWPZZQrX7SIrsEqnsLov4yTUWNmw-Fp95ueSt1J4f-A
```

The JWT secret is `whateversecret`.

You can use the [JWT debugger](https://jwt.io) to see what the payload is.

![image](https://user-images.githubusercontent.com/5080854/56461327-29040000-63b1-11e9-8294-45334973405d.png)

## Task 1 – Put user info on the GraphQL context

```js
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // get the user token from the request headers
    // Try console.log(req);

    return { user };
  },
});
```

### Get the token from the header

```js
const token = ???
```

> Make sure to remove "Bearer " from the header value

### Verify the token using the JWT secret `whateversecret` and return the logged in `user` as an object property.

```js
const jwt = require('jsonwebtoken');
const util = require('util');

// In the context
if (token) {
  const payload = await util.promisify(jwt.verify)(token, 'whateversecret');

  return { user: payload.user };
}
```

Return `null` otherwise.

## Task 2 – Create a `me` query

- Define the schema type & resolver
- Me should only return the current logged in user

> 💡 Check the [resolver signature](server-cheatsheet.md#resolver-signature) for help on accessing context in a resolver.

## Task 3 – Restrict access of confidential data

Since we're logged in as _glnnrys_, we want to restrict access of confidential data like other's _email adresses_.

So, let's make sure that:

- We don't see other people's email address in the query
- We can still see our email address in the query

Query:

```graphql
{
  users {
    username
    email
  }
}
```

Expected Result:

```json
{
  "data": {
    "users": [
      {
        "username": "glnnrys",
        "email": "glnnrys@gmail.com"
      },
      {
        "username": "bebraw",
        "email": null
      }
    ]
  }
}
```
