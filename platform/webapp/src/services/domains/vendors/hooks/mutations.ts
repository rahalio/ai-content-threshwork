/**
 * Vendors mutation hooks
 */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { vendorsService } from '../vendors.service';

export function useRegisterVendorConnector() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { body?: unknown }) =>
      vendorsService.registerVendorConnector(vars.body),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['vendors'] });
    },
  });
}

export function useStartVendorEvaluation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { vendorId: string; body?: unknown }) =>
      vendorsService.startVendorEvaluation(vars.vendorId, vars.body),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['vendors'] });
    },
  });
}

export function useCutoverVendorTraffic() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { queueId: string; body?: unknown }) =>
      vendorsService.cutoverVendorTraffic(vars.queueId, vars.body),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['vendors'] });
    },
  });
}
