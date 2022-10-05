import { component$, useStore } from '@builder.io/qwik';
import { DocumentHead, Link } from '@builder.io/qwik-city';
import { FilmResource } from './gql/film.generated';

export default component$(() => {
  const store = useStore({ id: 'ZmlsbXM6MQ' });

  return (
    <>
      Query response:
      <FilmResource
        vars={store}
        onPending$={() => <div>Loading...</div>}
        onRejected$={() => <div>Error</div>}
        onResolved$={(res) => (
          <>{res.data ? res.data.film.title : 'No results'}</>
        )}
      />
      <br />
      <input
        type='text'
        value={store.id}
        onKeyUp$={(ev) => (store.id = (ev.target as HTMLInputElement).value)}
      />
      <Link href={'/'}>Back home</Link>
    </>
  );
});

export const head: DocumentHead = {
  title: 'First page',
};
