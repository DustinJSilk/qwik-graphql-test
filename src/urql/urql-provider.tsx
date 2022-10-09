import {
  component$,
  createContext,
  Slot,
  useContextProvider,
  useStore,
} from '@builder.io/qwik';
import { UrqlAuthTokens } from './types';

export const UrqlCacheContext = createContext<{}>('urql-cache-context');
export const UrqlAuthContext =
  createContext<UrqlAuthTokens>('urql-auth-context');

export type UrqlProps = {
  auth: UrqlAuthTokens;
};

export const UrqlProvider = component$((props: UrqlProps) => {
  const cacheStore = useStore({});

  useContextProvider(UrqlCacheContext, cacheStore);
  useContextProvider(UrqlAuthContext, props.auth);

  return <Slot />;
});
