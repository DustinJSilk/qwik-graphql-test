# Qwik App ⚡️

Attempts at using GraphQL with Qwik.

This requires a pre-release version of Qwik. Manually build a production version and update your node modules.

### Limitations

- The GraphQL client cant be serialized so it can't be accessible to the whole app using Qwik context. Currently I'm storing it in the Window on the frontend and recreating it with each request on the server
- To share the cache between the frontend/backend we need the data saved in a Qwik store. I've copied Urqls ssrExchange and added an option to inject a store.
- useResource$ has to be in a component$ which means we can't create custom use- methods for each query like you would in React. So instead I've opted to copying Qwiks `<Resource />` component. Its quite verbose but this can easily be solved with code generation.

### TODO

Need to figure a few things out before I clean up and get things added to Urql/Qwik or a separate library.

- Do we need to track each primitive in the useResource$ or can we track the entire store?
- Authentication & sharing a header between frontend and server
- Mutations
- Optimistic response
- Cache reactivity

I'm using this public GraphQL API for testing `https://swapi-graphql.netlify.app/.netlify/functions/index`
