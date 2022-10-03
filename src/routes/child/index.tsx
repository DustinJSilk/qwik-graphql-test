import { component$ } from '@builder.io/qwik';
import { DocumentHead, Link } from '@builder.io/qwik-city';
import { FilmResource } from './film';

export default component$(() => {
  return (
    <>
      Query response:
      <FilmResource
        onPending={() => <div>Loading...</div>}
        onRejected={() => <div>Error</div>}
        onResolved={(res) => (
          <>{res.data ? res.data.film.title : 'No results'}</>
        )}
      />
      <br />
      <Link href={'/'}>Back home</Link>
    </>
  );
});

export const head: DocumentHead = {
  title: 'First page',
};
