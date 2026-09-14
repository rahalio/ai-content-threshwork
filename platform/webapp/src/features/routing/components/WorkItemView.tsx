'use client';

import {
  useGetRightsRecord,
  useGetRoutingDecision,
  useRecordHumanReview,
} from '@/services/domains/routing';
import {
  ErrorBanner,
  PageHeader,
  Panel,
  PrimaryButton,
  SecondaryButton,
  Skeleton,
  StatusChip,
} from '@/components/ui';
import { formatProblem } from '@/services/shared/http';
import { useState } from 'react';

export function WorkItemView({ workItemId }: { workItemId: string }) {
  const decision = useGetRoutingDecision(workItemId);
  const rights = useGetRightsRecord(workItemId);
  const review = useRecordHumanReview();
  const [error, setError] = useState<string | null>(null);
  const d = (decision.data ?? {}) as Record<string, unknown>;

  async function decide(outcome: 'accept' | 'override' | 'escalate') {
    setError(null);
    try {
      await review.mutateAsync({
        workItemId,
        body: { outcome, note: `Workbench ${outcome}` },
      });
    } catch (err) {
      setError(formatProblem(err));
    }
  }

  return (
    <div>
      <PageHeader
        title="Review workbench"
        subtitle="Adjudicate the machine proposal — do not start from a blank slate."
      />
      {error ? <div className="mb-4"><ErrorBanner message={error} /></div> : null}

      <div className="grid gap-4 lg:grid-cols-5">
        <Panel className="lg:col-span-3">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-xl text-ink">Proposed decision</h2>
            <StatusChip status="watch" label="HITL" />
          </div>
          {decision.isLoading ? (
            <Skeleton className="h-40" />
          ) : (
            <>
              <div className="mb-4 flex flex-wrap gap-3">
                <div className="rounded-md bg-threshold-soft/40 px-3 py-2">
                  <div className="text-[10px] uppercase tracking-wide text-ink/50">
                    Confidence
                  </div>
                  <div className="font-mono text-lg text-threshold">
                    {String(d.confidence ?? d.score ?? '—')}
                  </div>
                </div>
                <div className="rounded-md bg-surface-sunken px-3 py-2">
                  <div className="text-[10px] uppercase tracking-wide text-ink/50">
                    Lane
                  </div>
                  <div className="text-sm font-medium">
                    {String(d.lane ?? d.decision ?? 'joint')}
                  </div>
                </div>
              </div>
              <pre className="max-h-64 overflow-auto rounded bg-surface-sunken p-3 font-mono text-[11px]">
                {JSON.stringify(decision.data ?? { workItemId }, null, 2)}
              </pre>
              <div className="mt-4 flex flex-wrap gap-2">
                <PrimaryButton
                  type="button"
                  disabled={review.isPending}
                  onClick={() => void decide('accept')}
                >
                  Accept proposal
                </PrimaryButton>
                <SecondaryButton
                  type="button"
                  disabled={review.isPending}
                  onClick={() => void decide('override')}
                >
                  Override
                </SecondaryButton>
                <SecondaryButton
                  type="button"
                  disabled={review.isPending}
                  onClick={() => void decide('escalate')}
                >
                  Escalate
                </SecondaryButton>
              </div>
            </>
          )}
        </Panel>
        <Panel className="lg:col-span-2">
          <h2 className="mb-2 font-display text-lg text-ink">Rights gate</h2>
          {rights.isLoading ? (
            <Skeleton className="h-32" />
          ) : rights.isError ? (
            <p className="text-sm text-ink/55">No rights record — treat as unverified.</p>
          ) : (
            <pre className="max-h-72 overflow-auto rounded bg-surface-sunken p-3 font-mono text-[11px]">
              {JSON.stringify(rights.data, null, 2)}
            </pre>
          )}
        </Panel>
      </div>
    </div>
  );
}
