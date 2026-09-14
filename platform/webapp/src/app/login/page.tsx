'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/auth-context';
import {
  ErrorBanner,
  Field,
  inputClass,
  PrimaryButton,
  SecondaryButton,
  StatusChip,
} from '@/components/ui';
import { formatProblem } from '@/services/shared/http';

export default function LoginPage() {
  const { signInWithApiKey, signInWithPassword } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<'password' | 'apiKey'>('apiKey');
  const [apiKey, setApiKey] = useState('ddd_demo_local_dev_key');
  const [email, setEmail] = useState('ops@threshwork.local');
  const [password, setPassword] = useState('demo');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === 'apiKey') {
        if (!apiKey.trim()) throw new Error('API key required');
        await signInWithApiKey(apiKey.trim());
      } else {
        await signInWithPassword(email, password);
      }
      router.replace('/');
    } catch (err) {
      setError(formatProblem(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-inverse lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(194,120,3,0.28),transparent_42%),radial-gradient(circle_at_85%_10%,rgba(31,111,235,0.22),transparent_40%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px threshold-rail animate-pulseLine" />
        <div className="relative flex h-full flex-col justify-between p-12 text-on-inverse">
          <div>
            <p className="font-display text-4xl leading-tight">Threshwork</p>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-threshold-soft">
              Where the line falls
            </p>
            <div className="mt-4">
              <StatusChip status="info" label="Sandbox" />
            </div>
            <p className="mt-6 max-w-md text-base text-on-inverse/85">
              Score every queue. Set the confidence threshold. Meter what each
              vendor actually delivers against the business case that funded it.
            </p>
          </div>
          <p className="max-w-md text-sm text-on-inverse/55">
            Control plane for content operations — not a classifier, not a BPO
            marketplace.
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center px-6 py-12"
      >
        <form onSubmit={onSubmit} className="w-full max-w-md space-y-5">
          <div>
            <h1 className="font-display text-3xl text-ink">Sign in</h1>
            <p className="mt-1 text-sm text-ink/55">
              Operator console for portfolio, queues, work, and vendors.
            </p>
          </div>

          <div className="flex gap-2">
            <SecondaryButton
              type="button"
              className={mode === 'apiKey' ? 'border-accent text-accent' : ''}
              onClick={() => setMode('apiKey')}
            >
              API key
            </SecondaryButton>
            <SecondaryButton
              type="button"
              className={mode === 'password' ? 'border-accent text-accent' : ''}
              onClick={() => setMode('password')}
            >
              Password
            </SecondaryButton>
          </div>

          {error ? <ErrorBanner message={error} /> : null}

          {mode === 'apiKey' ? (
            <Field label="API key" hint="Local demo: ddd_demo_local_dev_key">
              <input
                className={inputClass}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                autoComplete="off"
              />
            </Field>
          ) : (
            <>
              <Field label="Email">
                <input
                  className={inputClass}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
              <Field label="Password">
                <input
                  className={inputClass}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>
            </>
          )}

          <PrimaryButton type="submit" disabled={busy} className="w-full">
            {busy ? 'Signing in…' : 'Enter console'}
          </PrimaryButton>
        </form>
      </motion.div>
    </div>
  );
}
