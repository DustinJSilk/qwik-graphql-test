import {
  component$,
  createContext,
  Slot,
  useContextProvider,
  useStore,
} from '@builder.io/qwik';
import { ClientOptions as UrqlClientOptions } from '@urql/core';

export type ClientOptions = Omit<
  UrqlClientOptions,
  'fetchOptions' | 'fetch' | 'exchanges'
>;

export const UrqlOptionsContext = createContext<ClientOptions>(
  'urql-options-context'
);

export const UrqlCacheContext = createContext<{}>('urql-cache-context');

export type UrqlProviderProps = {
  options: ClientOptions;
};

export const UrqlProvider = component$((props: UrqlProviderProps) => {
  const cacheStore = useStore({});

  useContextProvider(UrqlOptionsContext, props.options);
  useContextProvider(UrqlCacheContext, cacheStore);

  return <Slot />;
});
