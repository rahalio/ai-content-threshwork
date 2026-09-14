/**
 * Routing query hooks
 */
import { useQuery } from '@tanstack/react-query';
import { routingService } from '../routing.service';

export function useListWorkItems(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['routing', 'listWorkItems'],
    queryFn: ({ signal }) => routingService.listWorkItems(undefined, signal),
    ...options
  });
}

export function useGetRoutingDecision(workItemId: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['routing', 'getRoutingDecision', workItemId],
    queryFn: ({ signal }) => routingService.getRoutingDecision(workItemId, undefined, signal),
    ...options,
    enabled: Boolean(workItemId)
  });
}

export function useGetRightsRecord(workItemId: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['routing', 'getRightsRecord', workItemId],
    queryFn: ({ signal }) => routingService.getRightsRecord(workItemId, undefined, signal),
    ...options,
    enabled: Boolean(workItemId)
  });
}

export function useListCalibrationSamples(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['routing', 'listCalibrationSamples'],
    queryFn: ({ signal }) => routingService.listCalibrationSamples(undefined, signal),
    ...options
  });
}

export function useListAppeals(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['routing', 'listAppeals'],
    queryFn: ({ signal }) => routingService.listAppeals(undefined, signal),
    ...options
  });
}

export function useListResponseClocks(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['routing', 'listResponseClocks'],
    queryFn: ({ signal }) => routingService.listResponseClocks(undefined, signal),
    ...options
  });
}
