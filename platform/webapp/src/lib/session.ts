export type OperatorRole =
  | 'admin'
  | 'ops'
  | 'analyst'
  | 'viewer'
  | 'policy'
  | 'sourcing';

export type SessionOperator = {
  userId: string;
  email: string;
  displayName: string;
  role: OperatorRole;
};

const OPERATOR_KEY = 'threshwork.session.operator';
const ROLE_KEY = 'threshwork.session.role';

export function getSessionOperator(): SessionOperator | null {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(OPERATOR_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionOperator;
  } catch {
    return null;
  }
}

export function setSessionOperator(op: SessionOperator): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(OPERATOR_KEY, JSON.stringify(op));
  window.localStorage.setItem(ROLE_KEY, op.role);
}

export function clearSessionOperator(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(OPERATOR_KEY);
  window.localStorage.removeItem(ROLE_KEY);
}

export function getOperatorRole(): OperatorRole {
  if (typeof window === 'undefined') return 'admin';
  const r = window.localStorage.getItem(ROLE_KEY);
  if (
    r === 'admin' ||
    r === 'ops' ||
    r === 'analyst' ||
    r === 'viewer' ||
    r === 'policy' ||
    r === 'sourcing'
  ) {
    return r;
  }
  return getSessionOperator()?.role ?? 'admin';
}

export function setOperatorRole(role: OperatorRole): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(ROLE_KEY, role);
}
