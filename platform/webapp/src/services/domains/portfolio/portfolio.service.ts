/**
 * Portfolio Service — handwritten client over OpenAPI (post-codegen).
 */
import { apiClient } from '@/services/shared/infrastructure';
import { makeService } from '@/services/shared/infrastructure/service-wrapper';
import { unwrap } from '@/services/shared/http';

const raw = {
  /** Get benefit record */
  async getBenefitRecord(queueId: string, params?: Record<string, string | number | boolean | undefined>, signal?: AbortSignal) {
    return unwrap(apiClient.get(`/v1/queues/${queueId}/benefit`, { params, signal }));
  },

  /** List egress records */
  async listEgressRecords(params?: Record<string, string | number | boolean | undefined>, signal?: AbortSignal) {
    return unwrap(apiClient.get(`/v1/governance/egress-records`, { params, signal }));
  },

  /** Get exposure ledger */
  async getExposureLedger(agentId: string, params?: Record<string, string | number | boolean | undefined>, signal?: AbortSignal) {
    return unwrap(apiClient.get(`/v1/governance/exposure/${agentId}`, { params, signal }));
  },

  /** List roadmap entries */
  async listRoadmapEntries(params?: Record<string, string | number | boolean | undefined>, signal?: AbortSignal) {
    return unwrap(apiClient.get(`/v1/roadmap`, { params, signal }));
  },

  /** Rescore roadmap */
  async rescoreRoadmap(body?: unknown, signal?: AbortSignal) {
    return unwrap(apiClient.post(`/v1/roadmap/rescore`, { body, signal }));
  }
};

export const portfolioService = makeService(raw, 'portfolio');
