import {
  component$,
  useRef,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';
import { DocumentHead, Link } from '@builder.io/qwik-city';
import { AddFilmResource } from './gql/add-film.generated';
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

  const storeA = useStore({ id: '0' });
  const storeB = useStore(
    { input: { title: 'Newly added' } },
    { recursive: true }
  );
  const titleRef = useRef();

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
          Add film title to show ID:
          <input type='text' value={storeB.input.title} ref={titleRef} />
          <button
            onKeyUp$={() =>
              (storeB.input.title = (
                titleRef.current as HTMLInputElement
              ).value)
            }
          >
            Add
          </button>
          <br />
          <AddFilmResource
            vars={storeB}
            onPending$={() => <div>Loading...</div>}
            onRejected$={(reason) => <div>Error {reason}</div>}
            onResolved$={(res) => (
              <>{res.data ? res.data.addFilm.id : 'Failed'}</>
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
