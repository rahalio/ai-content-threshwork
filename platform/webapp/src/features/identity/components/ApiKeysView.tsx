'use client';

import { useListTenantApiKeys } from '@/services/domains/identity';
import { asItems } from '@/services/shared/http';
import { EmptyState, PageHeader, Panel, Skeleton, StatusChip } from '@/components/ui';

export function ApiKeysView() {
  const q = useListTenantApiKeys();
  const items = asItems(q.data);

  return (
    <div>
      <PageHeader
        title="API keys"
        subtitle="Server-to-server ingest and connector credentials."
      />
      <Panel>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl text-ink">Keys</h2>
          <StatusChip
            status={q.isError ? 'fail' : q.isLoading ? 'watch' : 'ok'}
            label={q.isError ? 'API' : q.isLoading ? 'Loading' : `${items.length} keys`}
          />
        </div>
        {q.isLoading ? (
          <Skeleton className="h-24" />
        ) : items.length === 0 ? (
          <EmptyState
            title="No API keys"
            body="Create a key for platform ingest. Local demo key: ddd_demo_local_dev_key."
          />
        ) : (
          <ul className="divide-y divide-ink/8 text-sm">
            {items.map((k, i) => (
              <li key={String(k.keyId ?? k.id ?? i)} className="flex justify-between py-3">
                <span className="font-medium">{String(k.name ?? k.keyId ?? 'Key')}</span>
                <span className="font-mono text-xs text-ink/50">
                  {String(k.keyId ?? k.id ?? '')}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
