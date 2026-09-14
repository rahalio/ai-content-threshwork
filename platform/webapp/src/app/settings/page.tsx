import Link from 'next/link';
import { PageHeader, Panel } from '@/components/ui';

export default function SettingsPage() {
  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Operators, API keys, and console session."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/settings/api-keys">
          <Panel className="transition hover:border-accent/40">
            <h2 className="font-display text-xl text-ink">API keys</h2>
            <p className="mt-1 text-sm text-ink/60">
              Server-to-server ingest and connector credentials.
            </p>
          </Panel>
        </Link>
        <Link href="/settings/users">
          <Panel className="transition hover:border-accent/40">
            <h2 className="font-display text-xl text-ink">Operators</h2>
            <p className="mt-1 text-sm text-ink/60">
              Console users and role assignments.
            </p>
          </Panel>
        </Link>
      </div>
    </div>
  );
}
