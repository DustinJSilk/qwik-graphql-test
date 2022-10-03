import {
  component$,
  JSXNode,
  Resource,
  useContext,
  useResource$,
} from '@builder.io/qwik';
import { AnyVariables, gql, OperationResult } from '@urql/core';
import { getClient } from '../../components/urql/get-client';
import {
  UrqlCacheContext,
  UrqlOptionsContext,
} from '../../components/urql/urql-provider';

export type AllFilms = {
  film: {
    title: string;
    id: string;
  };
};

export type FilmResourceProps = {
  onResolved: (value: OperationResult<AllFilms, AnyVariables>) => JSXNode;
  onPending?: () => JSXNode;
  onRejected?: (reason: any) => JSXNode;
};

export const FilmResource = component$((props: FilmResourceProps) => {
  const options = useContext(UrqlOptionsContext);
  const initialCacheState = useContext(UrqlCacheContext);

  const resource = useResource$(async () => {
    const FilmQuery = gql`
      query Query($id: ID!) {
        film(id: $id) {
          id
          title
        }
      }
    `;

    const client = getClient(options, initialCacheState);

    return client
      .query<AllFilms>(FilmQuery, { id: 'ZmlsbXM6MQ==' })
      .toPromise();
  });

  return (
    <Resource
      value={resource}
      onPending={props.onPending}
      onRejected={props.onRejected}
      onResolved={props.onResolved}
    />
  );
});
