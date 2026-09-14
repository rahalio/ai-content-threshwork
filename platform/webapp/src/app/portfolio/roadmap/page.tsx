'use client';

import { useListRoadmapEntries, useRescoreRoadmap } from '@/services/domains/portfolio';
import { asItems, formatProblem } from '@/services/shared/http';
import {
  EmptyState,
  ErrorBanner,
  PageHeader,
  Panel,
  PrimaryButton,
  Skeleton,
} from '@/components/ui';
import { useState } from 'react';

export default function RoadmapPage() {
  const roadmap = useListRoadmapEntries();
  const rescore = useRescoreRoadmap();
  const items = asItems(roadmap.data);
  const [error, setError] = useState<string | null>(null);

  async function onRescore() {
    setError(null);
    try {
      await rescore.mutateAsync({
        body: { trigger: 'manual', rationale: 'Console re-score' },
      });
      await roadmap.refetch();
    } catch (err) {
      setError(formatProblem(err));
    }
  }

  return (
    <div>
      <PageHeader
        title="Roadmap"
        subtitle="Scheduled and trigger-driven re-scores with recorded rationale."
        actions={
          <PrimaryButton
            type="button"
            disabled={rescore.isPending}
            onClick={() => void onRescore()}
          >
            Re-score now
          </PrimaryButton>
        }
      />
      {error ? (
        <div className="mb-4">
          <ErrorBanner message={error} />
        </div>
      ) : null}
      <Panel>
        {roadmap.isLoading ? (
          <Skeleton className="h-24" />
        ) : items.length === 0 ? (
          <EmptyState title="No entries" body="Run a re-score when volume, regulation, or vendor capability shifts." />
        ) : (
          <pre className="overflow-auto rounded bg-surface-sunken p-4 font-mono text-[11px]">
            {JSON.stringify(items, null, 2)}
          </pre>
        )}
      </Panel>
    </div>
  );
}
