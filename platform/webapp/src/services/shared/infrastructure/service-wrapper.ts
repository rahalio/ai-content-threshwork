function enrichError(
  err: unknown,
  domain: string | undefined,
  method: string,
): Error {
  const base =
    err instanceof Error
      ? err
      : new Error(typeof err === 'string' ? err : 'Unknown error');
  const domainPrefix = domain ? `[${domain}] ` : '';
  const wrapped = new Error(`${domainPrefix}${method}: ${base.message}`);
  wrapped.cause = base;
  return wrapped;
}

export function makeService<T extends Record<string, unknown>>(
  raw: T,
  domain?: string,
): T {
  return new Proxy(raw, {
    get(target, prop, receiver) {
      const value = Reflect.get(target, prop, receiver) as unknown;
      if (typeof prop !== 'string') return value;
      if (typeof value !== 'function') return value;

      return async (...args: unknown[]) => {
        try {
          return await (value as (...a: unknown[]) => unknown)(...args);
        } catch (err) {
          throw enrichError(err, domain, prop);
        }
      };
    },
  }) as T;
}
