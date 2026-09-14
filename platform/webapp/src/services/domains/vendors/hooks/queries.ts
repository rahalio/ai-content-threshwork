/**
 * Vendors query hooks
 */
import { useQuery } from '@tanstack/react-query';
import { vendorsService } from '../vendors.service';

export function useListVendorConnectors(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['vendors', 'listVendorConnectors'],
    queryFn: ({ signal }) => vendorsService.listVendorConnectors(undefined, signal),
    ...options
  });
}

export function useListVendorEvaluations(vendorId: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['vendors', 'listVendorEvaluations', vendorId],
    queryFn: ({ signal }) => vendorsService.listVendorEvaluations(vendorId, undefined, signal),
    ...options,
    enabled: Boolean(vendorId)
  });
}

export function useListGoldenSets(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['vendors', 'listGoldenSets'],
    queryFn: ({ signal }) => vendorsService.listGoldenSets(undefined, signal),
    ...options
  });
}
