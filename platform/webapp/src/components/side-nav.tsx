'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const NAV = [
  { href: '/', label: 'Portfolio', exact: true },
  { href: '/queues', label: 'Queues', exact: false },
  { href: '/work', label: 'Work', exact: false },
  { href: '/vendors', label: 'Vendors', exact: false },
  { href: '/settings', label: 'Settings', exact: false },
] as const;

export function SideNav({ testId }: { testId?: string }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 flex-col gap-1 px-3 pb-6" data-testid={testId}>
      {NAV.map((item) => {
        const active = item.exact
          ? pathname === item.href
          : pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              'rounded-md px-3 py-2 text-sm font-medium transition',
              active
                ? 'bg-accent/12 text-accent'
                : 'text-ink/70 hover:bg-surface-sunken hover:text-ink',
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
