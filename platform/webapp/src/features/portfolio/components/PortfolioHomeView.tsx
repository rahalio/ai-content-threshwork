'use client';

import Link from 'next/link';
import { useListRoadmapEntries } from '@/services/domains/portfolio';
import { asItems } from '@/services/shared/http';
import { EmptyState, PageHeader, Panel, Skeleton, StatusChip } from '@/components/ui';

export function PortfolioHomeView() {
  const roadmap = useListRoadmapEntries();
  const items = asItems(roadmap.data);

  return (
    <div>
      <PageHeader
        title="Portfolio"
        subtitle="Roadmap, realised benefit, and exposure — keep pilot conclusions from becoming permanent."
        actions={
          <Link
            href="/portfolio/roadmap"
            className="rounded-md border border-ink/15 px-3 py-2 text-sm font-medium hover:bg-surface-sunken"
          >
            Open roadmap
          </Link>
        }
      />

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <Panel>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-ink/55">
              Roadmap
            </h2>
            <StatusChip status="info" label="Live" />
          </div>
          <p className="font-display text-2xl text-ink">Re-score cadence</p>
          <p className="mt-2 text-sm text-ink/60">
            Trigger-driven scorecard runs with recorded rationale for the sponsor.
          </p>
        </Panel>
        <Link href="/portfolio/egress">
          <Panel className="h-full transition hover:border-accent/40">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-ink/55">
                Egress
              </h2>
              <StatusChip status="watch" label="Audit" />
            </div>
            <p className="font-display text-2xl text-ink">Processing register</p>
            <p className="mt-2 text-sm text-ink/60">
              What left the boundary, to which vendor, under which terms.
            </p>
          </Panel>
        </Link>
        <Link href="/portfolio/exposure">
          <Panel className="h-full transition hover:border-accent/40">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-ink/55">
                Exposure
              </h2>
              <StatusChip status="ok" label="Capped" />
            </div>
            <p className="font-display text-2xl text-ink">Agent wellbeing</p>
            <p className="mt-2 text-sm text-ink/60">
              Graphic-content hours against policy caps — never a peer league table.
            </p>
          </Panel>
        </Link>
      </div>

      <Panel>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl text-ink">Recent roadmap entries</h2>
          <StatusChip
            status={roadmap.isError ? 'fail' : roadmap.isLoading ? 'watch' : 'ok'}
            label={roadmap.isError ? 'API' : roadmap.isLoading ? 'Loading' : `${items.length} rows`}
          />
        </div>
        {roadmap.isLoading ? (
          <div className="space-y-2">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        ) : items.length === 0 ? (
          <EmptyState
            title="No roadmap entries yet"
            body="Re-score from the roadmap screen when regulatory, volume, or vendor triggers fire."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-ink/10 text-xs uppercase tracking-wide text-ink/50">
                <tr>
                  <th className="py-2 pr-4 font-medium">Entry</th>
                  <th className="py-2 pr-4 font-medium">Trigger</th>
                  <th className="py-2 font-medium">When</th>
                </tr>
              </thead>
              <tbody>
                {items.slice(0, 12).map((row, i) => (
                  <tr key={String(row.roadmapEntryId ?? row.id ?? i)} className="border-b border-ink/5">
                    <td className="py-2.5 pr-4 font-mono text-xs">
                      {String(row.roadmapEntryId ?? row.id ?? '—')}
                    </td>
                    <td className="py-2.5 pr-4 text-ink/80">
                      {String(row.trigger ?? row.rationale ?? row.reason ?? '—')}
                    </td>
                    <td className="py-2.5 font-mono text-xs text-ink/55">
                      {String(row.createdAt ?? row.rescoredAt ?? '—')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  );
}
