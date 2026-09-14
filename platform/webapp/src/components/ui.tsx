import clsx from 'clsx';
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-8 animate-fadeUp">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl tracking-tight text-ink">{title}</h1>
          {subtitle ? (
            <p className="mt-1 max-w-2xl text-sm text-ink/60">{subtitle}</p>
          ) : null}
        </div>
        {actions}
      </div>
    </div>
  );
}

export function Panel({
  children,
  className,
  ...rest
}: {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={clsx(
        'rounded-lg border border-ink/10 bg-surface-raised p-5 shadow-panel',
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  );
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-ink/55">
        {label}
      </span>
      {children}
      {hint ? <span className="block text-xs text-ink/45">{hint}</span> : null}
    </label>
  );
}

export const inputClass =
  'w-full rounded-md border border-ink/15 bg-surface-raised px-3 py-2 text-sm text-ink outline-none ring-accent/30 focus:ring-2';

export function PrimaryButton({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-semibold text-on-accent transition hover:opacity-90 disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export function SecondaryButton({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-md border border-ink/15 bg-surface-raised px-4 py-2 text-sm font-medium text-ink transition hover:bg-surface-sunken disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export function ErrorBanner({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="rounded-md border border-status-fail/30 bg-status-fail/10 px-3 py-2 text-sm text-status-fail"
    >
      {message}
    </div>
  );
}

export function StatusChip({
  status,
  label,
}: {
  status: 'info' | 'watch' | 'fail' | 'ok';
  label: string;
}) {
  const colors = {
    info: 'bg-status-info/15 text-status-info',
    watch: 'bg-status-watch/15 text-status-watch',
    fail: 'bg-status-fail/15 text-status-fail',
    ok: 'bg-status-ok/15 text-status-ok',
  };
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wide',
        colors[status],
      )}
    >
      {label}
    </span>
  );
}

export function EmptyState({
  title,
  body,
}: {
  title: string;
  body?: string;
}) {
  return (
    <div className="rounded-lg border border-dashed border-ink/15 px-6 py-12 text-center">
      <p className="font-display text-lg text-ink">{title}</p>
      {body ? <p className="mt-2 text-sm text-ink/55">{body}</p> : null}
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        'animate-pulse rounded bg-ink/10',
        className ?? 'h-8 w-full',
      )}
    />
  );
}
