/**
 * Queues query hooks
 */
import { useQuery } from '@tanstack/react-query';
import { queuesService } from '../queues.service';

export function useListQueues(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['queues', 'listQueues'],
    queryFn: ({ signal }) => queuesService.listQueues(undefined, signal),
    ...options
  });
}

export function useGetQueue(queueId: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['queues', 'getQueue', queueId],
    queryFn: ({ signal }) => queuesService.getQueue(queueId, undefined, signal),
    ...options,
    enabled: Boolean(queueId)
  });
}

export function useGetQueueScorecard(queueId: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['queues', 'getQueueScorecard', queueId],
    queryFn: ({ signal }) => queuesService.getQueueScorecard(queueId, undefined, signal),
    ...options,
    enabled: Boolean(queueId)
  });
}

export function useGetThresholdPolicy(queueId: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['queues', 'getThresholdPolicy', queueId],
    queryFn: ({ signal }) => queuesService.getThresholdPolicy(queueId, undefined, signal),
    ...options,
    enabled: Boolean(queueId)
  });
}
