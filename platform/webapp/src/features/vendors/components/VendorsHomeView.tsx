'use client';

import Link from 'next/link';
import {
  useListGoldenSets,
  useListVendorConnectors,
  useListVendorEvaluations,
} from '@/services/domains/vendors';
import { asItems } from '@/services/shared/http';
import { EmptyState, PageHeader, Panel, Skeleton, StatusChip } from '@/components/ui';

export function VendorsHomeView() {
  const connectors = useListVendorConnectors();
  const vendorItems = asItems(connectors.data);
  const firstVendorId = String(vendorItems[0]?.vendorId ?? vendorItems[0]?.id ?? '');
  const evaluations = useListVendorEvaluations(firstVendorId, {
    enabled: Boolean(firstVendorId),
  });
  const golden = useListGoldenSets();
  const evalItems = asItems(evaluations.data);
  const goldenItems = asItems(golden.data);

  return (
    <div>
      <PageHeader
        title="Vendors"
        subtitle="Connectors, golden sets, shadow evaluations — measure on your sample, not theirs."
        actions={
          <Link
            href="/vendors/cutover"
            className="rounded-md bg-accent px-3 py-2 text-sm font-semibold text-on-accent"
          >
            Cutover
          </Link>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel className="lg:col-span-1">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg text-ink">Connectors</h2>
            <StatusChip status="info" label={`${vendorItems.length}`} />
          </div>
          {connectors.isLoading ? (
            <Skeleton className="h-24" />
          ) : vendorItems.length === 0 ? (
            <EmptyState title="No connectors" body="Register a vendor connector to begin shadowing." />
          ) : (
            <ul className="space-y-2 text-sm">
              {vendorItems.map((v, i) => (
                <li key={String(v.vendorId ?? v.id ?? i)} className="rounded border border-ink/8 px-3 py-2">
                  <div className="font-medium">{String(v.name ?? v.vendorId ?? 'Vendor')}</div>
                  <div className="font-mono text-[11px] text-ink/45">
                    {String(v.vendorId ?? v.id ?? '')}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Panel>
        <Panel>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg text-ink">Shadow evaluations</h2>
            <StatusChip status="watch" label={`${evalItems.length}`} />
          </div>
          {evaluations.isLoading ? (
            <Skeleton className="h-24" />
          ) : evalItems.length === 0 ? (
            <p className="text-sm text-ink/55">No bake-offs running.</p>
          ) : (
            <pre className="max-h-56 overflow-auto rounded bg-surface-sunken p-3 font-mono text-[11px]">
              {JSON.stringify(evalItems.slice(0, 5), null, 2)}
            </pre>
          )}
        </Panel>
        <Panel>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg text-ink">Golden sets</h2>
            <StatusChip status="ok" label={`${goldenItems.length}`} />
          </div>
          {golden.isLoading ? (
            <Skeleton className="h-24" />
          ) : goldenItems.length === 0 ? (
            <p className="text-sm text-ink/55">Labelled samples will power bake-offs.</p>
          ) : (
            <pre className="max-h-56 overflow-auto rounded bg-surface-sunken p-3 font-mono text-[11px]">
              {JSON.stringify(goldenItems.slice(0, 5), null, 2)}
            </pre>
          )}
        </Panel>
      </div>
    </div>
  );
}
