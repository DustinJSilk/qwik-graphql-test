import {
  component$,
  createContext,
  Slot,
  useContextProvider,
  useStore,
} from '@builder.io/qwik';

export const UrqlCacheContext = createContext<{}>('urql-cache-context');

export const UrqlProvider = component$(() => {
  const cacheStore = useStore({});

  useContextProvider(UrqlCacheContext, cacheStore);

  return <Slot />;
});
