'use client';

import { useListTenantUsers } from '@/services/domains/identity';
import { asItems } from '@/services/shared/http';
import { EmptyState, PageHeader, Panel, Skeleton, StatusChip } from '@/components/ui';

export function OperatorsView() {
  const q = useListTenantUsers();
  const items = asItems(q.data);

  return (
    <div>
      <PageHeader title="Operators" subtitle="Console users and roles." />
      <Panel>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl text-ink">Users</h2>
          <StatusChip
            status={q.isError ? 'fail' : q.isLoading ? 'watch' : 'ok'}
            label={q.isError ? 'API' : q.isLoading ? 'Loading' : `${items.length} users`}
          />
        </div>
        {q.isLoading ? (
          <Skeleton className="h-24" />
        ) : items.length === 0 ? (
          <EmptyState title="No operators" body="Create operators via identity API." />
        ) : (
          <ul className="divide-y divide-ink/8 text-sm">
            {items.map((u, i) => (
              <li key={String(u.userId ?? u.id ?? i)} className="flex justify-between py-3">
                <div>
                  <div className="font-medium">
                    {String(u.displayName ?? u.email ?? 'Operator')}
                  </div>
                  <div className="text-xs text-ink/50">{String(u.email ?? '')}</div>
                </div>
                <StatusChip status="info" label={String(u.role ?? '—')} />
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
