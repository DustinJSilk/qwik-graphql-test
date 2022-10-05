import {
  component$,
  JSXNode,
  Resource,
  useContext,
  useResource$,
} from '@builder.io/qwik';
import { AnyVariables, gql, OperationResult } from '@urql/core';
import { getClient } from '../../../components/urql/get-client';
import {
  UrqlCacheContext,
  UrqlOptionsContext,
} from '../../../components/urql/urql-provider';

export type Film = {
  film: {
    title: string;
    id: string;
  };
};

export type FilmResourceProps = {
  vars: {
    id: string;
  };
  onResolved$: (value: OperationResult<Film, AnyVariables>) => JSXNode;
  onPending$?: () => JSXNode;
  onRejected$?: (reason: any) => JSXNode;
};

/**
 * This entire file should be auto generated for every query.
 * See https://www.the-guild.dev/graphql/codegen
 */
export const FilmResource = component$((props: FilmResourceProps) => {
  const options = useContext(UrqlOptionsContext);
  const initialCacheState = useContext(UrqlCacheContext);
  const vars = props.vars;

  const resource = useResource$<OperationResult<Film, AnyVariables>>(
    async ({ track }) => {
      track(vars, 'id');

      const FilmQuery = gql`
        query Query($id: ID!) {
          film(id: $id) {
            id
            title
          }
        }
      `;

      const client = getClient(options, initialCacheState);

      console.log('Running query');
      return client.query<Film>(FilmQuery, vars).toPromise();
    }
  );

  return (
    <Resource
      value={resource}
      onPending={props.onPending$}
      onRejected={props.onRejected$}
      onResolved={props.onResolved$}
    />
  );
});
