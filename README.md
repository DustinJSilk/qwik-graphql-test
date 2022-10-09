# Qwik App ⚡️

Attempts at using GraphQL with Qwik.

This requires a pre-release version of Qwik and the i18n pr (until its merged of course)
`git checkout pr-i18n`
`git rebase origin/main`
`yarn build.full`
`yarn build.qwik-city`

Then copy `packages/qwik/dist` and `packages/qwik-city/lib` to your node_modules to replace `qwik` and `qwik-city`

Run the test graphql server which supports some basic queries and mutations
`yarn server`

Run firebase auth emulator to simulate an authentication server
`yarn emulator`

### Successes

- Queries and mutations work on client and during SSR
- Server state is shared to the frontend
- Authentication is working
- Auth tokens are forwarded to the API server on client and during SSR
- The Urql folder is almost ready to be a third party package either standalone or part of Urql or even Qwik.

### Limitations

- To share the cache between the frontend/backend we need the data saved in a Qwik store. I've copied Urqls ssrExchange and added an option to inject a store.
- The mutation example uses a deep object as the mutation input. The only way i could get the query to re-run when the input changes was to update the `input` field in the store, **not the title beneath.** The track method might not work recursively.

### TODO

- Cache reactivity + optimistic response
- Code generators
