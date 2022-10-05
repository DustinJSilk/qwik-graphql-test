# Qwik App ⚡️

Attempts at using GraphQL with Qwik.

This requires a pre-release version of Qwik. Manually build a production version and update your node modules.

Run the server using `node ./server/main.js` which supports some basic queries and mutations

### Limitations

- The GraphQL client cant be serialized so it can't be accessible to the whole app using Qwik context. Currently I'm storing it in the Window on the frontend and recreating it with each request on the server
- To share the cache between the frontend/backend we need the data saved in a Qwik store. I've copied Urqls ssrExchange and added an option to inject a store.
- The mutation example uses a deep object input, the only way i could get the query to rerun was to update the `input` field in the store, not just the title. The track method might not work recursively.

### TODO

Need to figure a few things out before I clean up and get things added to Urql/Qwik or a separate library.

- ~~Do we need to track each primitive in the useResource$ or can we track the entire store?~~ Seems to work, need to test recursion
- Authentication & sharing a header between frontend and server
- Mutations
- Optimistic response
- Need to be able to create the gql client in the root app to allow custom exchanges. Stop using context + provide
- Cache reactivity
