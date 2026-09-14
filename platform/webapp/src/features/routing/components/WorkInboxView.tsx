'use client';

import Link from 'next/link';
import { useListWorkItems } from '@/services/domains/routing';
import { asItems } from '@/services/shared/http';
import { EmptyState, PageHeader, Panel, Skeleton, StatusChip } from '@/components/ui';

export function WorkInboxView() {
  const q = useListWorkItems();
  const items = asItems(q.data);

  return (
    <div>
      <PageHeader
        title="Work"
        subtitle="Clock-aware inbox — machine proposals for human adjudication."
        actions={
          <div className="flex gap-2">
            <Link
              href="/work/clocks"
              className="rounded-md border border-ink/15 px-3 py-2 text-sm hover:bg-surface-sunken"
            >
              Clocks
            </Link>
            <Link
              href="/work/appeals"
              className="rounded-md border border-ink/15 px-3 py-2 text-sm hover:bg-surface-sunken"
            >
              Appeals
            </Link>
          </div>
        }
      />
      <Panel>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl text-ink">Work items</h2>
          <StatusChip
            status={q.isError ? 'fail' : q.isLoading ? 'watch' : 'ok'}
            label={q.isError ? 'API' : q.isLoading ? 'Loading' : `${items.length} items`}
          />
        </div>
        {q.isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
          </div>
        ) : items.length === 0 ? (
          <EmptyState
            title="Inbox clear"
            body="Items escalated below the queue threshold will appear here with proposal + evidence."
          />
        ) : (
          <ul className="divide-y divide-ink/8">
            {items.map((row, i) => {
              const id = String(row.workItemId ?? row.id ?? i);
              return (
                <li key={id} className="flex items-center justify-between gap-3 py-3">
                  <div>
                    <div className="font-medium text-ink">
                      {String(row.queueId ?? 'queue')} · {String(row.state ?? 'open')}
                    </div>
                    <div className="font-mono text-[11px] text-ink/45">{id}</div>
                  </div>
                  <Link
                    href={`/work/${encodeURIComponent(id)}`}
                    className="text-sm font-medium text-accent hover:underline"
                  >
                    Review
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </Panel>
    </div>
  );
}
