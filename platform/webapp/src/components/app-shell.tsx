'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';
import clsx from 'clsx';
import { useAuth } from '@/contexts/auth-context';
import { isSandboxMode } from '@/services/shared/config/runtime-env';
import { SideNav } from '@/components/side-nav';
import { getSessionOperator } from '@/lib/session';

function Brand() {
  return (
    <Link href="/" className="flex flex-col gap-0.5">
      <span className="font-display text-xl tracking-tight text-ink">
        Threshwork
      </span>
      <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-threshold">
        Automation portfolio
      </span>
    </Link>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const { ready, authenticated, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const sandbox = isSandboxMode();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const operator = getSessionOperator();

  useEffect(() => {
    if (!ready) return;
    if (!authenticated && pathname !== '/login') {
      router.replace('/login');
    }
  }, [ready, authenticated, pathname, router]);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  if (!ready) {
    return (
      <div className="grid min-h-screen place-items-center text-ink/60">
        Loading…
      </div>
    );
  }

  if (pathname === '/login') {
    return <>{children}</>;
  }

  if (!authenticated) {
    return null;
  }

  return (
    <div className="relative min-h-screen">
      {sandbox ? <div className="sandbox-watermark" aria-hidden /> : null}

      {sandbox ? (
        <div className="relative z-20 bg-status-watch/15 px-4 py-2 text-center text-sm font-medium text-status-watch">
          Sandbox — thresholds and vendor scores are simulation data
        </div>
      ) : null}

      <div className="relative z-10 flex min-h-screen">
        <aside className="sticky top-0 hidden h-screen w-56 shrink-0 flex-col overflow-y-auto border-e border-ink/10 bg-surface-raised/80 lg:flex">
          <div className="px-5 py-5">
            <Brand />
          </div>
          <SideNav testId="primary-nav" />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-40 border-b border-ink/10 bg-surface-raised/90 backdrop-blur">
            <div className="flex items-center justify-between gap-3 px-4 py-2.5">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="rounded-md border border-ink/15 px-2.5 py-1 text-sm lg:hidden"
                  aria-expanded={drawerOpen}
                  aria-label="Menu"
                  onClick={() => setDrawerOpen((v) => !v)}
                >
                  ☰
                </button>
                <div className="lg:hidden">
                  <Brand />
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-ink/70">
                <span className="hidden sm:inline font-mono text-xs">
                  {operator?.displayName ?? operator?.email ?? 'Operator'}
                </span>
                <button
                  type="button"
                  className="rounded-md border border-ink/15 px-2.5 py-1 text-xs font-medium hover:bg-surface-sunken"
                  onClick={() => {
                    signOut();
                    router.replace('/login');
                  }}
                >
                  Sign out
                </button>
              </div>
            </div>
          </header>

          {drawerOpen ? (
            <div
              className={clsx(
                'border-b border-ink/10 bg-surface-raised px-2 py-3 lg:hidden',
              )}
            >
              <SideNav />
            </div>
          ) : null}

          <main id="main" className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
