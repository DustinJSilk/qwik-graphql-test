import { useContext, useResource$ } from '@builder.io/qwik';
import { AnyVariables, OperationResult, TypedDocumentNode } from '@urql/core';
import { fetchWithAbort } from './fetch-with-abort';
import { UrqlCacheContext, UrqlOptionsContext } from './urql-provider';
import { useClient } from './use-client';

export const useMutation = <Variables extends AnyVariables, Data = any>(
  query: Omit<TypedDocumentNode<Data, Variables>, '__apiType'> & {
    kind: string;
  },
  vars: Variables
) => {
  const options = useContext(UrqlOptionsContext);
  const initialCacheState = useContext(UrqlCacheContext);

  return useResource$<OperationResult<Data, Variables>>(
    async ({ track, cleanup }) => {
      if (vars) {
        track(vars);
      }

      const client = useClient(options, initialCacheState);

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
