'use client';

import { useCutoverVendorTraffic } from '@/services/domains/vendors';
import {
  ErrorBanner,
  Field,
  inputClass,
  PageHeader,
  Panel,
  PrimaryButton,
} from '@/components/ui';
import { formatProblem } from '@/services/shared/http';
import { useState } from 'react';

export default function CutoverPage() {
  const cutover = useCutoverVendorTraffic();
  const [queueId, setQueueId] = useState('');
  const [vendorId, setVendorId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<unknown>(null);

  async function onCutover() {
    setError(null);
    try {
      const res = await cutover.mutateAsync({
        queueId,
        body: {
          targetVendorId: vendorId,
          rollbackWindowMinutes: 240,
        },
      });
      setResult(res);
    } catch (err) {
      setError(formatProblem(err));
    }
  }

  return (
    <div>
      <PageHeader
        title="Vendor cutover"
        subtitle="Shift-speed cutover with a tested fallback — only after shadow evaluation on your golden set."
      />
      {error ? (
        <div className="mb-4">
          <ErrorBanner message={error} />
        </div>
      ) : null}
      <Panel className="max-w-lg space-y-4">
        <Field label="Queue ID">
          <input className={inputClass} value={queueId} onChange={(e) => setQueueId(e.target.value)} />
        </Field>
        <Field label="Target vendor ID">
          <input className={inputClass} value={vendorId} onChange={(e) => setVendorId(e.target.value)} />
        </Field>
        <PrimaryButton
          type="button"
          disabled={cutover.isPending || !queueId || !vendorId}
          onClick={() => void onCutover()}
        >
          Cut over traffic
        </PrimaryButton>
        {result ? (
          <pre className="overflow-auto rounded bg-surface-sunken p-3 font-mono text-[11px]">
            {JSON.stringify(result, null, 2)}
          </pre>
        ) : null}
      </Panel>
    </div>
  );
}
