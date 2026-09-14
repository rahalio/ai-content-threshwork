'use client';

import { useParams } from 'next/navigation';
import {
  useGetQueueScorecard,
  useScoreQueue,
} from '@/services/domains/queues';
import {
  ErrorBanner,
  PageHeader,
  Panel,
  PrimaryButton,
  Skeleton,
} from '@/components/ui';
import { formatProblem } from '@/services/shared/http';
import { useState } from 'react';

export default function QueueScorecardPage() {
  const params = useParams();
  const queueId = decodeURIComponent(String(params.id ?? ''));
  const scorecard = useGetQueueScorecard(queueId);
  const score = useScoreQueue();
  const [error, setError] = useState<string | null>(null);

  async function onScore() {
    setError(null);
    try {
      await score.mutateAsync({
        queueId,
        body: {
          weightingsLocked: true,
          capacity: 3,
          difficulty: 3,
          impact: 4,
        },
      });
      await scorecard.refetch();
    } catch (err) {
      setError(formatProblem(err));
    }
  }

  return (
    <div>
      <PageHeader
        title="Scorecard"
        subtitle="Weightings are locked before scores — automation order must be defensible."
        actions={
          <PrimaryButton type="button" disabled={score.isPending} onClick={() => void onScore()}>
            {score.isPending ? 'Scoring…' : 'Score queue'}
          </PrimaryButton>
        }
      />
      {error ? <div className="mb-4"><ErrorBanner message={error} /></div> : null}
      <Panel>
        {scorecard.isLoading ? (
          <Skeleton className="h-40" />
        ) : (
          <pre className="overflow-auto rounded bg-surface-sunken p-4 font-mono text-[11px]">
            {JSON.stringify(scorecard.data ?? { queueId, status: 'unscored' }, null, 2)}
          </pre>
        )}
      </Panel>
    </div>
  );
}
