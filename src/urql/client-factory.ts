import { Client } from '@urql/core';

/**
 * A factory for creating new Urql clients. It must accept a Qwik store that
 * can be used with the ssrExchange to resume state after SSR and an auth token
 * which can be used by the authExchange to pass a bearer token with requests
 */
export type ClientFactory = (ssrStore: {}, authToken?: string) => Client;

let clientFactory: ClientFactory | undefined;

/** Registers a factory for creating new Urql clients */
export const registerClientFactory = (factory: ClientFactory) => {
  clientFactory = factory;
};

/**
 * Creates a new instance of Urql using the factory passed into
 * registerClientFactory
 */
export const newClient = (ssrStore: {}, authToken?: string) => {
  if (!clientFactory) {
    throw new Error(
      'A ClientFactory has not been registered. Add ' +
        '`registerClient(() => createClient({ ... })) to root.tsx`'
    );
  }

  return clientFactory(ssrStore, authToken);
};
