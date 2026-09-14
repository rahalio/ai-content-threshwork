export function validateApiResponse<T>(data: T): T {
  return data;
}

export function formatValidationError(err: unknown): string {
  if (err instanceof Error) return err.message;
  return String(err ?? 'Validation failed');
}

export function unwrapDataEnvelope<T>(payload: { data?: T } | T): T {
  if (
    payload &&
    typeof payload === 'object' &&
    'data' in payload &&
    (payload as { data?: T }).data !== undefined
  ) {
    return (payload as { data: T }).data;
  }
  return payload as T;
}
