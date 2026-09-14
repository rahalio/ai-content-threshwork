/**
 * Vendors Service — handwritten client over OpenAPI (post-codegen).
 */
import { apiClient } from '@/services/shared/infrastructure';
import { makeService } from '@/services/shared/infrastructure/service-wrapper';
import { unwrap } from '@/services/shared/http';

const raw = {
  /** List vendor connectors */
  async listVendorConnectors(params?: Record<string, string | number | boolean | undefined>, signal?: AbortSignal) {
    return unwrap(apiClient.get(`/v1/vendors`, { params, signal }));
  },

  /** Register vendor connector */
  async registerVendorConnector(body?: unknown, signal?: AbortSignal) {
    return unwrap(apiClient.post(`/v1/vendors`, { body, signal }));
  },

  /** List vendor evaluations */
  async listVendorEvaluations(vendorId: string, params?: Record<string, string | number | boolean | undefined>, signal?: AbortSignal) {
    return unwrap(apiClient.get(`/v1/vendors/${vendorId}/evaluations`, { params, signal }));
  },

  /** Start vendor evaluation */
  async startVendorEvaluation(vendorId: string, body?: unknown, signal?: AbortSignal) {
    return unwrap(apiClient.post(`/v1/vendors/${vendorId}/evaluations`, { body, signal }));
  },

  /** Cut over vendor traffic */
  async cutoverVendorTraffic(queueId: string, body?: unknown, signal?: AbortSignal) {
    return unwrap(apiClient.post(`/v1/queues/${queueId}/vendor-cutover`, { body, signal }));
  },

  /** List golden sets */
  async listGoldenSets(params?: Record<string, string | number | boolean | undefined>, signal?: AbortSignal) {
    return unwrap(apiClient.get(`/v1/golden-sets`, { params, signal }));
  }
};

export const vendorsService = makeService(raw, 'vendors');
