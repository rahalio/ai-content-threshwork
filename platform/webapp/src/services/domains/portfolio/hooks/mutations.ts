/**
 * Portfolio mutation hooks
 */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { portfolioService } from '../portfolio.service';

export function useRescoreRoadmap() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { body?: unknown }) =>
      portfolioService.rescoreRoadmap(vars.body),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['portfolio'] });
    },
  });
}
