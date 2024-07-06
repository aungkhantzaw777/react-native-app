import { useAuthStore } from "@/store/useAuth";
import {
  useQuery,
  QueryKey,
  QueryFunctionContext,
} from "@tanstack/react-query";

export const useApi = <TQueryKey extends QueryKey, TQueryFnData>(
  queryKey: TQueryKey,
  queryFn: (
    ctx: QueryFunctionContext<TQueryKey>,
    token: string
  ) => Promise<TQueryFnData>
) => {
  const token = useAuthStore((state) => state.token) || "";

  return useQuery({
    queryFn: (ctx) => queryFn(ctx, token),
    queryKey,
    enabled: !!token,
    // select(data) {
    //   return data.data
    // },
  });
};
