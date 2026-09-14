import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from '@tanstack/react-query';
import { getEffectiveOrgId } from './tenant-state';

export type TenantMutationFn<TData, TVariables> = (
  orgId: string | null,
  variables: TVariables,
) => Promise<TData>;

export type TenantMutationOptions<TData, TError, TVariables, TContext> =
  UseMutationOptions<TData, TError, TVariables, TContext> & {
    invalidateQueries?: unknown[][];
  };

export function useTenantMutation<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
>(
  mutationFn: TenantMutationFn<TData, TVariables>,
  options?: TenantMutationOptions<TData, TError, TVariables, TContext>,
) {
  const { invalidateQueries, ...rest } = options ?? {};
  const queryClient = useQueryClient();
  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn: async (variables: TVariables) => {
      const orgId = getEffectiveOrgId();
      return mutationFn(orgId, variables);
    },
    ...rest,
    onSuccess: (...args) => {
      if (invalidateQueries?.length) {
        invalidateQueries.forEach((queryKey) =>
          queryClient.invalidateQueries({ queryKey }),
        );
      }
      rest.onSuccess?.(...args);
    },
  });
}
