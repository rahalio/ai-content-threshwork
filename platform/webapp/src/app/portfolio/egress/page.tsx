'use client';

import { useListEgressRecords } from '@/services/domains/portfolio';
import { asItems } from '@/services/shared/http';
import { EmptyState, PageHeader, Panel, Skeleton, StatusChip } from '@/components/ui';

export default function EgressPage() {
  const q = useListEgressRecords();
  const items = asItems(q.data);

  return (
    <div>
      <PageHeader
        title="Egress register"
        subtitle="What left the operation boundary — sufficient to answer a client or supervisory authority."
      />
      <Panel>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl text-ink">Records</h2>
          <StatusChip
            status={q.isError ? 'fail' : q.isLoading ? 'watch' : 'ok'}
            label={q.isError ? 'API' : q.isLoading ? 'Loading' : `${items.length}`}
          />
        </div>
        {q.isLoading ? (
          <Skeleton className="h-24" />
        ) : items.length === 0 ? (
          <EmptyState title="No egress yet" body="Classifier calls will appear here with terms and territory." />
        ) : (
          <pre className="overflow-auto rounded bg-surface-sunken p-4 font-mono text-[11px]">
            {JSON.stringify(items, null, 2)}
          </pre>
        )}
      </Panel>
    </div>
  );
}
