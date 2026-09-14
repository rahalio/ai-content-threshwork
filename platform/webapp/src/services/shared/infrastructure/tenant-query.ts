import {
  useQuery,
  type QueryKey,
  type UseQueryOptions,
} from '@tanstack/react-query';
import { getEffectiveOrgId } from './tenant-state';

export type TenantQueryFn<T> = (
  orgId: string | null,
  signal?: AbortSignal,
) => Promise<T>;

export function useTenantQuery<
  TQueryFnData,
  TError = unknown,
  TData = TQueryFnData,
>(
  queryKey: QueryKey,
  queryFn: TenantQueryFn<TQueryFnData>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, QueryKey>,
    'queryKey' | 'queryFn' | 'enabled'
  > & { enabled?: boolean },
) {
  const orgId = getEffectiveOrgId();

  return useQuery<TQueryFnData, TError, TData, QueryKey>({
    queryKey: [...queryKey, orgId ?? 'no-tenant'],
    enabled: options?.enabled ?? true,
    queryFn: ({ signal }) => queryFn(orgId, signal),
    ...options,
  });
}
