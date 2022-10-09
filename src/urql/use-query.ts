import { useContext, useResource$ } from '@builder.io/qwik';
import { AnyVariables, OperationResult, TypedDocumentNode } from '@urql/core';
import { fetchWithAbort } from './fetch-with-abort';
import { getClient } from './get-client';
import { UrqlAuthContext, UrqlCacheContext } from './urql-provider';

export const useQuery = <Variables extends AnyVariables, Data = any>(
  query: TypedDocumentNode<Data, Variables> & {
    kind: string;
  },
  vars: Variables
) => {
  const initialCacheState = useContext(UrqlCacheContext);
  const tokens = useContext(UrqlAuthContext);

  return useResource$<OperationResult<Data, Variables>>(
    async ({ track, cleanup }) => {
      if (vars) {
        track(vars);
      }

      const client = await getClient(initialCacheState, tokens);

      const abortCtrl = new AbortController();
      cleanup(() => abortCtrl.abort());

      const res = await client
        .query<Data, Variables>(query, vars, {
          fetch: fetchWithAbort(abortCtrl),
        })
        .toPromise();

      delete res.operation.context.fetch;

      return res;
    }
  );
};
