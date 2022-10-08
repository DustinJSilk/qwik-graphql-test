import { useContext, useResource$ } from '@builder.io/qwik';
import { AnyVariables, OperationResult, TypedDocumentNode } from '@urql/core';
import { AuthStateContext } from '~/contexts';
import { fetchWithAbort } from './fetch-with-abort';
import { getClient } from './get-client';
import { UrqlCacheContext } from './urql-provider';

export const useMutation = <Variables extends AnyVariables, Data = any>(
  query: Omit<TypedDocumentNode<Data, Variables>, '__apiType'> & {
    kind: string;
  },
  vars: Variables
) => {
  const initialCacheState = useContext(UrqlCacheContext);
  const { token } = useContext(AuthStateContext);

  return useResource$<OperationResult<Data, Variables>>(
    async ({ track, cleanup }) => {
      if (vars) {
        track(vars);
      }

      const client = getClient(initialCacheState, token);

      const abortCtrl = new AbortController();
      cleanup(() => abortCtrl.abort());

      const res = await client
        .mutation<Data, Variables>(query, vars, {
          fetch: fetchWithAbort(abortCtrl),
        })
        .toPromise();

      delete res.operation.context.fetch;

      return res;
    }
  );
};
