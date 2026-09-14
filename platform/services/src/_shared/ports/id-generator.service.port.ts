/**
 * IdGeneratorService Port — starter prefixes (extend in consumer repos).
 */

import type { DomainCode } from '@ddd/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  queId(): string;
  rouId(): string;
  vndId(): string;
  pflId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
