import { component$, JSXNode, Resource } from '@builder.io/qwik';
import { AnyVariables, gql, OperationResult } from '@urql/core';
import { useQuery } from '~/components/urql/use-query';

/**
 * This entire file should be auto generated for every query.
 * See https://www.the-guild.dev/graphql/codegen
 */

export type Film = {
  film: {
    title: string;
    id: string;
  };
};

export const FilmQuery = gql`
  query Query($id: String!) {
    film(id: $id) {
      id
      title
    }
  }
`;

export const useFilmQuery = (vars: { id: string }) => {
  return useQuery(FilmQuery, vars);
};

export type FilmResourceProps = {
  vars: {
    id: string;
  };
  onResolved$: (value: OperationResult<Film, AnyVariables>) => JSXNode;
  onPending$?: () => JSXNode;
  onRejected$?: (reason: any) => JSXNode;
};

export const FilmResource = component$((props: FilmResourceProps) => {
  const vars = props.vars;
  const value = useFilmQuery(vars);

  return (
    <Resource
      value={value}
      onPending={props.onPending$}
      onRejected={props.onRejected$}
      onResolved={props.onResolved$}
    />
  );
});
