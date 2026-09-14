'use client';

import { useGetExposureLedger } from '@/services/domains/portfolio';
import { Field, inputClass, PageHeader, Panel, Skeleton, StatusChip } from '@/components/ui';
import { useState } from 'react';

export default function ExposurePage() {
  const [agentId, setAgentId] = useState('agent_demo');
  const ledger = useGetExposureLedger(agentId, { enabled: Boolean(agentId) });

  return (
    <div>
      <PageHeader
        title="Exposure ledger"
        subtitle="Graphic-content hours against policy caps — self and wellbeing tone only; never a peer ranking."
      />
      <Panel className="mb-4 max-w-md">
        <Field label="Agent ID">
          <input
            className={inputClass}
            value={agentId}
            onChange={(e) => setAgentId(e.target.value)}
          />
        </Field>
      </Panel>
      <Panel>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-xl text-ink">Cap progress</h2>
          <StatusChip status="ok" label="Wellbeing" />
        </div>
        {ledger.isLoading ? (
          <Skeleton className="h-24" />
        ) : ledger.isError ? (
          <p className="text-sm text-ink/55">No ledger for this agent yet.</p>
        ) : (
          <pre className="overflow-auto rounded bg-surface-sunken p-4 font-mono text-[11px]">
            {JSON.stringify(ledger.data, null, 2)}
          </pre>
        )}
      </Panel>
    </div>
  );
}
