const ORG_ID_KEY = 'threshwork.orgId';

/** Single-tenant console; codegen services expect an org id string. */
export function getEffectiveOrgId(): string | null {
  if (typeof window === 'undefined') return 'default';
  return window.localStorage.getItem(ORG_ID_KEY) ?? 'default';
}

export function getEffectiveTenantId(): string | null {
  return getEffectiveOrgId();
}

export function setEffectiveOrgId(tenantId: string | null): void {
  if (typeof window === 'undefined') return;
  if (!tenantId) window.localStorage.removeItem(ORG_ID_KEY);
  else window.localStorage.setItem(ORG_ID_KEY, tenantId);
  window.dispatchEvent(new Event('tenant:orgId'));
}

export function setEffectiveTenantId(tenantId: string | null): void {
  setEffectiveOrgId(tenantId);
}
