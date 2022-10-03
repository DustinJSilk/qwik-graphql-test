# Qwik App ⚡️

Attempts at using GraphQL with Qwik.

- The GraphQL client cant be serialized so it can't be accessible to the whole app using Qwik context. Currently I'm storing it in the Window on the frontend and recreating it with each request on the server
- To share the cache between the frontend/backend we need the data saved in a Qwik store. I've copied Urqls ssrExchange and added an option to inject a store.
- useResource$ has to be in a component$ which means we can't create custom use- methods for each query like you would in React. So instead I've opted to copying Qwiks <Resource /> component. Its quite verbose but this can easily be solved with code generation.

I'm using this public GraphQL API for testing `https://swapi-graphql.netlify.app/.netlify/functions/index`
