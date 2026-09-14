'use client';

import { useListAppeals, useResolveAppeal } from '@/services/domains/routing';
import { asItems, formatProblem } from '@/services/shared/http';
import {
  EmptyState,
  ErrorBanner,
  PageHeader,
  Panel,
  SecondaryButton,
  Skeleton,
  StatusChip,
} from '@/components/ui';
import { useState } from 'react';

export default function AppealsPage() {
  const appeals = useListAppeals();
  const resolve = useResolveAppeal();
  const items = asItems(appeals.data);
  const [error, setError] = useState<string | null>(null);

  async function onResolve(appealId: string, outcome: 'uphold' | 'overturn') {
    setError(null);
    try {
      await resolve.mutateAsync({
        appealId,
        body: { outcome },
      });
      await appeals.refetch();
    } catch (err) {
      setError(formatProblem(err));
    }
  }

  return (
    <div>
      <PageHeader
        title="Appeals"
        subtitle="Second-human adjudication — not the same queue as live review."
      />
      {error ? (
        <div className="mb-4">
          <ErrorBanner message={error} />
        </div>
      ) : null}
      <Panel>
        {appeals.isLoading ? (
          <Skeleton className="h-24" />
        ) : items.length === 0 ? (
          <EmptyState title="No open appeals" body="Overturns feed calibration." />
        ) : (
          <ul className="divide-y divide-ink/8">
            {items.map((a, i) => {
              const id = String(a.appealId ?? a.id ?? i);
              return (
                <li key={id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                  <div>
                    <div className="font-mono text-xs text-ink/50">{id}</div>
                    <StatusChip status="watch" label={String(a.status ?? 'open')} />
                  </div>
                  <div className="flex gap-2">
                    <SecondaryButton
                      type="button"
                      disabled={resolve.isPending}
                      onClick={() => void onResolve(id, 'uphold')}
                    >
                      Uphold
                    </SecondaryButton>
                    <SecondaryButton
                      type="button"
                      disabled={resolve.isPending}
                      onClick={() => void onResolve(id, 'overturn')}
                    >
                      Overturn
                    </SecondaryButton>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Panel>
    </div>
  );
}
