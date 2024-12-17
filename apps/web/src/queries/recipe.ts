import { useXrpc } from "@/hooks/use-xrpc";
import { XRPC, XRPCError } from "@atcute/client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { notFound } from "@tanstack/react-router";

const RQKEY_ROOT = 'posts';
export const RQKEY = (cursor: string, did: string, rkey: string) => [RQKEY_ROOT, cursor, did, rkey];

export const useRecipesQuery = (cursor: string, did?: string) => {
  const { rpc } = useXrpc();
  return useQuery({
    queryKey: RQKEY(cursor, '', ''),
    queryFn: async () => {
      const res = await rpc.get('moe.hayden.cookware.getRecipes', {
        params: { cursor, did },
      });
      return res.data;
    },
  });
};

export const recipeQueryOptions = (rpc: XRPC, did: string, rkey: string) => {
  return queryOptions({
    queryKey: RQKEY('', did, rkey),
    queryFn: async () => {
      try {
      const res = await rpc.get('moe.hayden.cookware.getRecipe', {
        params: { did, rkey },
      });
      return res.data;
      } catch (err) {
        if (err instanceof XRPCError && err.kind && err.kind == 'not_found') {
          throw notFound({ routeId: '/_' });
        }
        throw err;
      }
    },
  });
};

export const useRecipeQuery = (did: string, rkey: string) => {
  const { rpc } = useXrpc();
  return useQuery(recipeQueryOptions(rpc, did, rkey));
};