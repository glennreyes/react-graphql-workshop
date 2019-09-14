# 8 – Setup deployment

In this exercise we are going to modify our Apollo Server to be compatible with Netlify Functions/Lambda's.

For this we are going to move and combine both client code and server code into the root and set them up in a way, so we can automatically deploy them to Netlify.

## Task 1 – Combine client & server code into the root

### 1.1 Move content of the `client` folder into the root:

```
├── .gitignore
├── package.json
├── public
└── src
```

> 💡 It's fine override `package.json` & `.gitignore`.

In the next step we will create move the graphql source code into the `lambda` folder for Netlify and modify our server to act as a lambda function.

### 1.2 Move following files in the `server` folder into `/src/lambda`:

```
├── db
├── index.js
├── resolvers.js
└── schema.js
```

Move `resolvers.js` and `schema.js` into a new folder under `/src/lambda/graphql/` and change import paths inside all of these files accordingly.

After that rename `index.js` into `graphql.js` and replace content into following:

```js
import { ApolloServer } from 'apollo-server-lambda';
import jwt from 'jsonwebtoken';
import util from 'util';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/schema';

const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({ event }) => {
    const token = event.headers.authorization
      ? event.headers.authorization.replace('Bearer ', '')
      : null;

    if (token) {
      const payload = await util.promisify(jwt.verify)(token, 'whateversecret');

      return { user: payload.user };
    }

    return null;
  },
  introspection: true,
  playground: true,
});

export const handler = server.createHandler();
```

> Note that the general implementation is the same, except starting the server, we just have a single export of a handler instead. Also, context prop `req` is now `event` instead.

### 1.3 Install missing server dependencies

```sh
yarn add apollo-server-lambda cuid jsonwebtoken
```

## 1.4 Run scripts

Now that we need to build both lambdas and the app simultaneously, we are going to modify our npm run scripts.

For that we will install following:

```sh
yarn add --dev npm-run-all netlify-lambda
```

... and change our run-scripts to following:

```json
{
  "build": "run-p build:**",
  "build:app": "react-scripts build",
  "build:lambda": "netlify-lambda build src/lambda",
  "start": "run-p start:**",
  "start:app": "react-scripts start",
  "start:lambda": "netlify-lambda serve src/lambda",
  "test": "react-scripts test"
}
```

### 1.5 Delete old folders `client` & `server`

Now were done migrating our previous client and server into the new structure, it should be safe to delete both folders.

## Task 2 Setup CRA

Now when we `yarn start:lambda`, this will start our graphql server locally under `http://localhost:9000/graphql`. For netlify, we need it to proxy under the same host as create react app and under `/.netlify/functions/graphql` instead.

To do this: we install:

```sh
yarn add http-proxy-middleware
```

... and add `/src/setupProxy.js`:

```js
const proxy = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    proxy('/.netlify/functions/', {
      target: 'http://localhost:9000/',
      pathRewrite: {
        '^/\\.netlify/functions': '',
      },
    }),
  );
};
```

> Proxying backends like this is a built-in feature in CRA. You can read more about it here: https://create-react-app.dev/docs/proxying-api-requests-in-development

## Task 3 – Netlify

### Task 3.1 netlify.toml

Create a `netlify.toml` under the root folder:

```
[build]
  command = "yarn build"
  functions = "lambda"
  publish = "build"
```

This tells Netlify to do following on deploy:

- Run `yarn build`
- Use `lambda` folder for Netlify functions
- Use `build` folder for the static site

### Task 3.2 Drag & Drop time!

Go to https://app.netlify.com and drag and drop your project folder, done! Netlify will handle the rest and your app should be deployed within minutes.
