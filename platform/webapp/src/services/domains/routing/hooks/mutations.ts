/**
 * Routing mutation hooks
 */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { routingService } from '../routing.service';

export function useSubmitWorkItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { body?: unknown }) =>
      routingService.submitWorkItem(vars.body),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['routing'] });
    },
  });
}

export function useRecordHumanReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { workItemId: string; body?: unknown }) =>
      routingService.recordHumanReview(vars.workItemId, vars.body),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['routing'] });
    },
  });
}

export function useOpenAppeal() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { body?: unknown }) =>
      routingService.openAppeal(vars.body),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['routing'] });
    },
  });
}

export function useResolveAppeal() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { appealId: string; body?: unknown }) =>
      routingService.resolveAppeal(vars.appealId, vars.body),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['routing'] });
    },
  });
}

export function usePreemptResponseClock() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { clockId: string; body?: unknown }) =>
      routingService.preemptResponseClock(vars.clockId, vars.body),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['routing'] });
    },
  });
}
