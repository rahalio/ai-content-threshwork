'use client';

import { useParams } from 'next/navigation';
import { useDecideAutomationApproval } from '@/services/domains/queues';
import {
  ErrorBanner,
  Field,
  inputClass,
  PageHeader,
  Panel,
  PrimaryButton,
  SecondaryButton,
} from '@/components/ui';
import { formatProblem } from '@/services/shared/http';
import { useState } from 'react';

export default function QueueGovernancePage() {
  const params = useParams();
  const queueId = decodeURIComponent(String(params.id ?? ''));
  const decide = useDecideAutomationApproval();
  const [rationale, setRationale] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [last, setLast] = useState<unknown>(null);

  async function onDecide(decision: 'approve' | 'refuse' | 'suspend' | 'revert') {
    setError(null);
    try {
      const res = await decide.mutateAsync({
        queueId,
        body: { decision, rationale: rationale || `${decision} via console` },
      });
      setLast(res);
    } catch (err) {
      setError(formatProblem(err));
    }
  }

  return (
    <div>
      <PageHeader
        title="Automation governance"
        subtitle="Approve, refuse, suspend, or revert automation — with a recorded reason."
      />
      {error ? (
        <div className="mb-4">
          <ErrorBanner message={error} />
        </div>
      ) : null}
      <Panel className="max-w-xl space-y-4">
        <Field label="Rationale">
          <textarea
            className={`${inputClass} min-h-[96px]`}
            value={rationale}
            onChange={(e) => setRationale(e.target.value)}
            placeholder="Policy definition stable; golden-set shadow complete…"
          />
        </Field>
        <div className="flex flex-wrap gap-2">
          <PrimaryButton
            type="button"
            disabled={decide.isPending}
            onClick={() => void onDecide('approve')}
          >
            Approve
          </PrimaryButton>
          <SecondaryButton
            type="button"
            disabled={decide.isPending}
            onClick={() => void onDecide('refuse')}
          >
            Refuse
          </SecondaryButton>
          <SecondaryButton
            type="button"
            disabled={decide.isPending}
            onClick={() => void onDecide('suspend')}
          >
            Suspend
          </SecondaryButton>
          <SecondaryButton
            type="button"
            disabled={decide.isPending}
            onClick={() => void onDecide('revert')}
          >
            Revert
          </SecondaryButton>
        </div>
        {last ? (
          <pre className="overflow-auto rounded bg-surface-sunken p-3 font-mono text-[11px]">
            {JSON.stringify(last, null, 2)}
          </pre>
        ) : null}
      </Panel>
    </div>
  );
}
