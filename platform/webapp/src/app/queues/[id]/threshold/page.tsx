'use client';

import { useParams } from 'next/navigation';
import {
  useGetThresholdPolicy,
  useSetThresholdPolicy,
} from '@/services/domains/queues';
import {
  ErrorBanner,
  Field,
  inputClass,
  PageHeader,
  Panel,
  PrimaryButton,
  Skeleton,
} from '@/components/ui';
import { formatProblem } from '@/services/shared/http';
import { useState } from 'react';

export default function QueueThresholdPage() {
  const params = useParams();
  const queueId = decodeURIComponent(String(params.id ?? ''));
  const policy = useGetThresholdPolicy(queueId);
  const setPolicy = useSetThresholdPolicy();
  const [floor, setFloor] = useState('0.92');
  const [error, setError] = useState<string | null>(null);

  async function onSave() {
    setError(null);
    try {
      await setPolicy.mutateAsync({
        queueId,
        body: {
          confidenceFloor: Number(floor),
          sampleRate: 0.05,
        },
      });
      await policy.refetch();
    } catch (err) {
      setError(formatProblem(err));
    }
  }

  return (
    <div>
      <PageHeader
        title="Threshold policy"
        subtitle="Impact tier determines the confidence floor — policy queues never share enrichment thresholds."
      />
      <div className="mb-4 h-px w-full threshold-rail" />
      {error ? (
        <div className="mb-4">
          <ErrorBanner message={error} />
        </div>
      ) : null}
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel>
          <Field label="Confidence floor" hint="Machine-final only above this score">
            <input
              className={`${inputClass} font-mono`}
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
            />
          </Field>
          <div className="mt-4">
            <PrimaryButton
              type="button"
              disabled={setPolicy.isPending}
              onClick={() => void onSave()}
            >
              Save policy
            </PrimaryButton>
          </div>
        </Panel>
        <Panel>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink/55">
            Current policy
          </h2>
          {policy.isLoading ? (
            <Skeleton className="h-32" />
          ) : (
            <pre className="overflow-auto rounded bg-surface-sunken p-3 font-mono text-[11px]">
              {JSON.stringify(policy.data ?? { queueId }, null, 2)}
            </pre>
          )}
        </Panel>
      </div>
    </div>
  );
}
