import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import { DocumentHead, Link } from '@builder.io/qwik-city';
import { FilmResource } from './gql/film.generated';

export default component$(() => {
  useStylesScoped$(`
    ul {
      column-gap: 40px;
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    li {
      background-color: #eee;
      padding: 20px;
    }
  `);

  const storeA = useStore({ id: '1' });
  const storeB = useStore({ id: '2' });

  return (
    <>
      <Link href={'/'}>Back home</Link>
      <br />
      <br />

      <ul>
        <li>
          Query film by ID:
          <input
            type='text'
            value={storeA.id}
            onKeyUp$={(ev) =>
              (storeA.id = (ev.target as HTMLInputElement).value)
            }
          />
          <br />
          <FilmResource
            vars={storeA}
            onPending$={() => <div>Loading...</div>}
            onRejected$={() => <div>Error</div>}
            onResolved$={(res) => (
              <>{res.data ? res.data.film.title : 'No results'}</>
            )}
          />
        </li>

        <li>
          Query film by ID:
          <input
            type='text'
            value={storeB.id}
            onKeyUp$={(ev) =>
              (storeB.id = (ev.target as HTMLInputElement).value)
            }
          />
          <br />
          <FilmResource
            vars={storeB}
            onPending$={() => <div>Loading...</div>}
            onRejected$={() => <div>Error</div>}
            onResolved$={(res) => (
              <>{res.data ? res.data.film.title : 'No results'}</>
            )}
          />
        </li>
      </ul>
    </>
  );
});

export const head: DocumentHead = {
  title: 'First page',
};
