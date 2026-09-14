'use client';

import {
  useListResponseClocks,
  usePreemptResponseClock,
} from '@/services/domains/routing';
import { asItems, formatProblem } from '@/services/shared/http';
import {
  EmptyState,
  ErrorBanner,
  PageHeader,
  Panel,
  PrimaryButton,
  Skeleton,
  StatusChip,
} from '@/components/ui';
import { useState } from 'react';

export default function ClocksPage() {
  const clocks = useListResponseClocks();
  const preempt = usePreemptResponseClock();
  const items = asItems(clocks.data);
  const [error, setError] = useState<string | null>(null);

  async function onPreempt(clockId: string) {
    setError(null);
    try {
      await preempt.mutateAsync({ clockId, body: { reason: 'at_risk' } });
      await clocks.refetch();
    } catch (err) {
      setError(formatProblem(err));
    }
  }

  return (
    <div>
      <PageHeader
        title="Response clocks"
        subtitle="Statutory and SLA windows — at-risk items pre-empt lower priority work."
      />
      {error ? (
        <div className="mb-4">
          <ErrorBanner message={error} />
        </div>
      ) : null}
      <Panel>
        {clocks.isLoading ? (
          <Skeleton className="h-24" />
        ) : items.length === 0 ? (
          <EmptyState title="No active clocks" body="Clock-bearing items appear here when at risk." />
        ) : (
          <ul className="divide-y divide-ink/8">
            {items.map((c, i) => {
              const id = String(c.clockId ?? c.id ?? i);
              const atRisk = String(c.status ?? '').toLowerCase().includes('risk');
              return (
                <li key={id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                  <div>
                    <div className="font-mono text-xs">{id}</div>
                    <div className="mt-1 flex gap-2">
                      <StatusChip
                        status={atRisk ? 'fail' : 'info'}
                        label={String(c.status ?? 'open')}
                      />
                      <span className="font-mono text-xs text-ink/55">
                        {String(c.deadlineAt ?? c.dueAt ?? '')}
                      </span>
                    </div>
                  </div>
                  <PrimaryButton
                    type="button"
                    disabled={preempt.isPending}
                    onClick={() => void onPreempt(id)}
                  >
                    Pre-empt
                  </PrimaryButton>
                </li>
              );
            })}
          </ul>
        )}
      </Panel>
    </div>
  );
}
