# Qwik App ⚡️

Attempts at using GraphQL with Qwik.

This requires a pre-release version of Qwik. Manually build a production version and update your node modules.

Run the server using `node ./server/main.js` which supports some basic queries and mutations

### Limitations

- The GraphQL client cant be serialized so it can't be accessible to the whole app using Qwik context. Currently I'm storing it in the Window on the frontend and recreating it with each request on the server
- To share the cache between the frontend/backend we need the data saved in a Qwik store. I've copied Urqls ssrExchange and added an option to inject a store.
- ~~useResource$ has to be in a component$ which means we can't create custom use- methods for each query like you would in React. So instead I've opted to copying Qwiks `<Resource />` component. Its quite verbose but this can easily be solved with code generation.~~ This was wrong. I might have been an old version maybe but it seems to work now.

### TODO

Need to figure a few things out before I clean up and get things added to Urql/Qwik or a separate library.

- ~~Do we need to track each primitive in the useResource$ or can we track the entire store?~~ Seems to work, need to test recursion
- Authentication & sharing a header between frontend and server
- Mutations
- Optimistic response
- Need to be able to create the gql client in the root app to allow custom exchanges. Stop using context + provide
- Cache reactivity
