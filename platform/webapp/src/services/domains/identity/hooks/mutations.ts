/**
 * Identity mutation hooks
 */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { identityService } from '../identity.service';

export function useCreateTenantApiKey() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { body?: unknown }) =>
      identityService.createTenantApiKey(vars.body),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['identity'] });
    },
  });
}

export function useRevokeTenantApiKey() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { keyId: string; params?: Record<string, string | number | boolean | undefined> }) =>
      identityService.revokeTenantApiKey(vars.keyId, vars.params),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['identity'] });
    },
  });
}

export function useCreateTenantUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { body?: unknown }) =>
      identityService.createTenantUser(vars.body),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['identity'] });
    },
  });
}

export function useUpdateTenantUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { userId: string; body?: unknown }) =>
      identityService.updateTenantUser(vars.userId, vars.body),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['identity'] });
    },
  });
}

export function useDisableTenantUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { userId: string; body?: unknown }) =>
      identityService.disableTenantUser(vars.userId, vars.body),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['identity'] });
    },
  });
}

export function useEnableTenantUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { userId: string; body?: unknown }) =>
      identityService.enableTenantUser(vars.userId, vars.body),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['identity'] });
    },
  });
}

export function useOperatorLogin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { body?: unknown }) =>
      identityService.operatorLogin(vars.body),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['identity'] });
    },
  });
}

export function useUpdateOperatorMe() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { body?: unknown }) =>
      identityService.updateOperatorMe(vars.body),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['identity'] });
    },
  });
}

export function useOperatorRefresh() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { body?: unknown }) =>
      identityService.operatorRefresh(vars.body),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['identity'] });
    },
  });
}

export function useOperatorLogout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { body?: unknown }) =>
      identityService.operatorLogout(vars.body),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['identity'] });
    },
  });
}
