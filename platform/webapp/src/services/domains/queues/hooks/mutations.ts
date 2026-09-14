/**
 * Queues mutation hooks
 */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queuesService } from '../queues.service';

export function useRegisterQueue() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { body?: unknown }) =>
      queuesService.registerQueue(vars.body),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['queues'] });
    },
  });
}

export function usePinPolicyDefinition() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { queueId: string; body?: unknown }) =>
      queuesService.pinPolicyDefinition(vars.queueId, vars.body),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['queues'] });
    },
  });
}

export function useScoreQueue() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { queueId: string; body?: unknown }) =>
      queuesService.scoreQueue(vars.queueId, vars.body),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['queues'] });
    },
  });
}

export function useSetThresholdPolicy() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { queueId: string; body?: unknown }) =>
      queuesService.setThresholdPolicy(vars.queueId, vars.body),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['queues'] });
    },
  });
}

export function useDecideAutomationApproval() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { queueId: string; body?: unknown }) =>
      queuesService.decideAutomationApproval(vars.queueId, vars.body),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['queues'] });
    },
  });
}
