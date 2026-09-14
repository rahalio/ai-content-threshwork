/**
 * Identity query hooks
 */
import { useQuery } from '@tanstack/react-query';
import { identityService } from '../identity.service';

export function useListTenantApiKeys(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['identity', 'listTenantApiKeys'],
    queryFn: ({ signal }) => identityService.listTenantApiKeys(undefined, signal),
    ...options
  });
}

export function useGetTenantApiKey(keyId: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['identity', 'getTenantApiKey', keyId],
    queryFn: ({ signal }) => identityService.getTenantApiKey(keyId, undefined, signal),
    ...options,
    enabled: Boolean(keyId)
  });
}

export function useListTenantUsers(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['identity', 'listTenantUsers'],
    queryFn: ({ signal }) => identityService.listTenantUsers(undefined, signal),
    ...options
  });
}

export function useGetTenantUser(userId: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['identity', 'getTenantUser', userId],
    queryFn: ({ signal }) => identityService.getTenantUser(userId, undefined, signal),
    ...options,
    enabled: Boolean(userId)
  });
}

export function useGetOperatorMe(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['identity', 'getOperatorMe'],
    queryFn: ({ signal }) => identityService.getOperatorMe(undefined, signal),
    ...options
  });
}
