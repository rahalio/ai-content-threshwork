/**
 * Routing Service — handwritten client over OpenAPI (post-codegen).
 */
import { apiClient } from '@/services/shared/infrastructure';
import { makeService } from '@/services/shared/infrastructure/service-wrapper';
import { unwrap } from '@/services/shared/http';

const raw = {
  /** List work items */
  async listWorkItems(params?: Record<string, string | number | boolean | undefined>, signal?: AbortSignal) {
    return unwrap(apiClient.get(`/v1/work-items`, { params, signal }));
  },

  /** Submit work item */
  async submitWorkItem(body?: unknown, signal?: AbortSignal) {
    return unwrap(apiClient.post(`/v1/work-items`, { body, signal }));
  },

  /** Get routing decision */
  async getRoutingDecision(workItemId: string, params?: Record<string, string | number | boolean | undefined>, signal?: AbortSignal) {
    return unwrap(apiClient.get(`/v1/work-items/${workItemId}/routing`, { params, signal }));
  },

  /** Get rights record */
  async getRightsRecord(workItemId: string, params?: Record<string, string | number | boolean | undefined>, signal?: AbortSignal) {
    return unwrap(apiClient.get(`/v1/work-items/${workItemId}/rights`, { params, signal }));
  },

  /** Record human review */
  async recordHumanReview(workItemId: string, body?: unknown, signal?: AbortSignal) {
    return unwrap(apiClient.post(`/v1/work-items/${workItemId}/review`, { body, signal }));
  },

  /** List calibration samples */
  async listCalibrationSamples(params?: Record<string, string | number | boolean | undefined>, signal?: AbortSignal) {
    return unwrap(apiClient.get(`/v1/review/calibration-samples`, { params, signal }));
  },

  /** List appeals */
  async listAppeals(params?: Record<string, string | number | boolean | undefined>, signal?: AbortSignal) {
    return unwrap(apiClient.get(`/v1/appeals`, { params, signal }));
  },

  /** Open appeal */
  async openAppeal(body?: unknown, signal?: AbortSignal) {
    return unwrap(apiClient.post(`/v1/appeals`, { body, signal }));
  },

  /** Resolve appeal */
  async resolveAppeal(appealId: string, body?: unknown, signal?: AbortSignal) {
    return unwrap(apiClient.post(`/v1/appeals/${appealId}/resolution`, { body, signal }));
  },

  /** List response clocks */
  async listResponseClocks(params?: Record<string, string | number | boolean | undefined>, signal?: AbortSignal) {
    return unwrap(apiClient.get(`/v1/response-clocks`, { params, signal }));
  },

  /** Preempt response clock */
  async preemptResponseClock(clockId: string, body?: unknown, signal?: AbortSignal) {
    return unwrap(apiClient.post(`/v1/response-clocks/${clockId}/preempt`, { body, signal }));
  }
};

export const routingService = makeService(raw, 'routing');
