import { isServer } from '@builder.io/qwik/build';
import { Client, createClient, dedupExchange, fetchExchange } from '@urql/core';
import { cacheExchange } from '@urql/exchange-graphcache';
import { ssrExchange } from './ssr-exchange';
import { ClientOptions } from './urql-provider';

export function getClient(options: ClientOptions, store: {}) {
  let client: Client | undefined = undefined;

  if (isServer || (!isServer && !(window as any).__urqlClient)) {
    const ssr = ssrExchange({
      isClient: !isServer,
      initialState: isServer ? undefined : store,
      store: store,
    });

    client = createClient({
      ...options,
      exchanges: [dedupExchange, cacheExchange({}), ssr, fetchExchange],
    });

    if (!isServer) {
      (window as any).__urqlClient = client;
    }
  } else if (!isServer && (window as any).__urqlClient) {
    client = (window as any).__urqlClient;
  }

  if (!client) {
    throw new Error('Unable to find Urql client');
  }

  return client;
}
