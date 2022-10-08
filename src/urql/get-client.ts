import { isServer } from '@builder.io/qwik/build';
import { Client } from '@urql/core';
import { newClient } from './client-factory';

export function getClient(ssrStore: {}, authToken?: string) {
  let client: Client | undefined = undefined;

  if (isServer || (!isServer && !(window as any).__urqlClient)) {
    client = newClient(ssrStore, authToken);

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
