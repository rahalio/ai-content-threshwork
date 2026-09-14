'use client';

import Link from 'next/link';
import {
  useGetQueue,
  useGetQueueScorecard,
  useGetThresholdPolicy,
} from '@/services/domains/queues';
import { PageHeader, Panel, Skeleton, StatusChip } from '@/components/ui';

export function QueueDetailView({ queueId }: { queueId: string }) {
  const queue = useGetQueue(queueId);
  const scorecard = useGetQueueScorecard(queueId);
  const threshold = useGetThresholdPolicy(queueId);
  const data = (queue.data ?? {}) as Record<string, unknown>;

  return (
    <div>
      <PageHeader
        title={String(data.name ?? data.displayName ?? queueId)}
        subtitle="Scorecard, impact-tier threshold, and automation governance for this queue."
        actions={
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/queues/${encodeURIComponent(queueId)}/scorecard`}
              className="rounded-md border border-ink/15 px-3 py-2 text-sm hover:bg-surface-sunken"
            >
              Scorecard
            </Link>
            <Link
              href={`/queues/${encodeURIComponent(queueId)}/threshold`}
              className="rounded-md border border-ink/15 px-3 py-2 text-sm hover:bg-surface-sunken"
            >
              Threshold
            </Link>
            <Link
              href={`/queues/${encodeURIComponent(queueId)}/governance`}
              className="rounded-md bg-accent px-3 py-2 text-sm font-semibold text-on-accent"
            >
              Governance
            </Link>
          </div>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink/55">
            Registry
          </h2>
          {queue.isLoading ? (
            <Skeleton className="h-24" />
          ) : (
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-ink/50">Queue ID</dt>
                <dd className="font-mono text-xs">{queueId}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-ink/50">Impact tier</dt>
                <dd>
                  <StatusChip
                    status="watch"
                    label={String(data.impactTier ?? '—')}
                  />
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-ink/50">Automation</dt>
                <dd>{String(data.automationStatus ?? data.status ?? '—')}</dd>
              </div>
            </dl>
          )}
        </Panel>
        <Panel>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink/55">
            Scorecard
          </h2>
          {scorecard.isLoading ? (
            <Skeleton className="h-24" />
          ) : scorecard.isError ? (
            <p className="text-sm text-ink/55">No scorecard yet — score before automating.</p>
          ) : (
            <pre className="max-h-40 overflow-auto rounded bg-surface-sunken p-3 font-mono text-[11px]">
              {JSON.stringify(scorecard.data, null, 2)}
            </pre>
          )}
        </Panel>
        <Panel>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink/55">
            Threshold policy
          </h2>
          <div className="mb-3 h-px w-full threshold-rail opacity-70" />
          {threshold.isLoading ? (
            <Skeleton className="h-24" />
          ) : threshold.isError ? (
            <p className="text-sm text-ink/55">
              Set a tier-specific confidence floor before machine-final decisions.
            </p>
          ) : (
            <pre className="max-h-40 overflow-auto rounded bg-surface-sunken p-3 font-mono text-[11px]">
              {JSON.stringify(threshold.data, null, 2)}
            </pre>
          )}
        </Panel>
      </div>
    </div>
  );
}
