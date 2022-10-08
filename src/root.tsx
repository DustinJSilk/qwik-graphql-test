import {
  component$,
  useClientEffect$,
  useContextProvider,
  useStore,
} from '@builder.io/qwik';
import {
  QwikCity,
  RouterOutlet,
  ServiceWorkerRegister,
} from '@builder.io/qwik-city';
import { apps } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import { clientFactory } from './client';
import { RouterHead } from './components/router-head/router-head';
import { AuthStateContext } from './contexts';
import { useCookie } from './hooks/use-cookie';
import { registerClientFactory } from './urql/client-factory';
import { UrqlProvider } from './urql/urql-provider';

import './global.css';

// Checks if firebase is already initialized which can happen with HMR in dev
if (apps.length === 0) {
  process.env['FIREBASE_AUTH_EMULATOR_HOST'] = 'localhost:9099';
  initializeApp({ projectId: 'qwik-test-5be00' });
}

export default component$(() => {
  registerClientFactory(clientFactory);

  // Adding this is the only way to make sure the frontend has access to the
  // Urql factory, however, it eagerly loads all dependencies. I need to find
  // a way to lazy load this only when the client needs it.
  useClientEffect$(
    () => {
      registerClientFactory(clientFactory);
    },
    { eagerness: 'load' }
  );

  // TODO: Verify session cookie and convert to token
  const session = useCookie('session');
  const authState = useStore({ token: session });
  useContextProvider(AuthStateContext, authState);

  return (
    <UrqlProvider>
      <QwikCity>
        <head>
          <meta charSet='utf-8' />
          <RouterHead />
        </head>
        <body lang='en'>
          <RouterOutlet />
          <ServiceWorkerRegister />
        </body>
      </QwikCity>
    </UrqlProvider>
  );
});
