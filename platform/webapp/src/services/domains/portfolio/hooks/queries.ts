/**
 * Portfolio query hooks
 */
import { useQuery } from '@tanstack/react-query';
import { portfolioService } from '../portfolio.service';

export function useGetBenefitRecord(queueId: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['portfolio', 'getBenefitRecord', queueId],
    queryFn: ({ signal }) => portfolioService.getBenefitRecord(queueId, undefined, signal),
    ...options,
    enabled: Boolean(queueId)
  });
}

export function useListEgressRecords(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['portfolio', 'listEgressRecords'],
    queryFn: ({ signal }) => portfolioService.listEgressRecords(undefined, signal),
    ...options
  });
}

export function useGetExposureLedger(agentId: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['portfolio', 'getExposureLedger', agentId],
    queryFn: ({ signal }) => portfolioService.getExposureLedger(agentId, undefined, signal),
    ...options,
    enabled: Boolean(agentId)
  });
}

export function useListRoadmapEntries(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['portfolio', 'listRoadmapEntries'],
    queryFn: ({ signal }) => portfolioService.listRoadmapEntries(undefined, signal),
    ...options
  });
}
