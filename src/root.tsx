import { $, component$, useContextProvider, useStore } from '@builder.io/qwik';
import {
  QwikCity,
  RouterOutlet,
  ServiceWorkerRegister,
} from '@builder.io/qwik-city';
import { apps } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import { registerClientFactory, UrqlProvider } from 'qwik-urql';
import { clientFactory } from './client';
import { RouterHead } from './components/router-head/router-head';
import { useCookie } from './hooks/use-cookie';

import { AuthStateContext } from './contexts';
import './global.css';

// Checks if firebase is already initialized which can happen with HMR in dev
if (apps.length === 0) {
  process.env['FIREBASE_AUTH_EMULATOR_HOST'] = 'localhost:9099';
  initializeApp({ projectId: 'qwik-test-5be00' });
}

export default component$(() => {
  registerClientFactory($(clientFactory));

  // TODO: Verify session cookie and convert to token
  const session = useCookie('session');
  const authState = useStore({ token: session });
  useContextProvider(AuthStateContext, authState);

  return (
    <UrqlProvider auth={authState}>
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
