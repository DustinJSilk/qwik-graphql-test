import { component$ } from '@builder.io/qwik';
import {
  QwikCity,
  RouterOutlet,
  ServiceWorkerRegister,
} from '@builder.io/qwik-city';
import { ClientOptions } from '@urql/core';
import { RouterHead } from './components/router-head/router-head';
import { UrqlProvider } from './components/urql/urql-provider';

import './global.css';

export default component$(() => {
  const clientOptions: ClientOptions = {
    url: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
  };

  return (
    <UrqlProvider options={clientOptions}>
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
