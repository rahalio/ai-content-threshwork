'use client';

import Link from 'next/link';
import { useListQueues } from '@/services/domains/queues';
import { asItems } from '@/services/shared/http';
import { EmptyState, PageHeader, Panel, Skeleton, StatusChip } from '@/components/ui';

function tierStatus(tier: unknown): 'info' | 'watch' | 'fail' | 'ok' {
  const t = String(tier ?? '').toLowerCase();
  if (t.includes('0') || t.includes('critical') || t.includes('policy')) return 'fail';
  if (t.includes('1') || t.includes('high')) return 'watch';
  if (t.includes('2') || t.includes('medium')) return 'info';
  return 'ok';
}

export function QueuesListView() {
  const q = useListQueues();
  const items = asItems(q.data);

  return (
    <div>
      <PageHeader
        title="Queues"
        subtitle="Registry, scorecards, impact-tier thresholds, and automation approval."
      />
      <Panel>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl text-ink">Queue registry</h2>
          <StatusChip
            status={q.isError ? 'fail' : q.isLoading ? 'watch' : 'ok'}
            label={q.isError ? 'API error' : q.isLoading ? 'Loading' : `${items.length} queues`}
          />
        </div>
        {q.isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
          </div>
        ) : items.length === 0 ? (
          <EmptyState
            title="No queues registered"
            body="Register a queue via API, then score it before any automation goes live."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-ink/10 text-xs uppercase tracking-wide text-ink/50">
                <tr>
                  <th className="py-2 pr-4 font-medium">Queue</th>
                  <th className="py-2 pr-4 font-medium">Impact tier</th>
                  <th className="py-2 pr-4 font-medium">Automation</th>
                  <th className="py-2 font-medium" />
                </tr>
              </thead>
              <tbody>
                {items.map((row, i) => {
                  const id = String(row.queueId ?? row.id ?? i);
                  return (
                    <tr key={id} className="border-b border-ink/5">
                      <td className="py-2.5 pr-4">
                        <div className="font-medium text-ink">
                          {String(row.name ?? row.displayName ?? id)}
                        </div>
                        <div className="font-mono text-[11px] text-ink/45">{id}</div>
                      </td>
                      <td className="py-2.5 pr-4">
                        <StatusChip
                          status={tierStatus(row.impactTier)}
                          label={String(row.impactTier ?? '—')}
                        />
                      </td>
                      <td className="py-2.5 pr-4 text-ink/70">
                        {String(row.automationStatus ?? row.status ?? '—')}
                      </td>
                      <td className="py-2.5 text-right">
                        <Link
                          href={`/queues/${encodeURIComponent(id)}`}
                          className="text-sm font-medium text-accent hover:underline"
                        >
                          Open
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  );
}
