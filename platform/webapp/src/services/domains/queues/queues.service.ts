/**
 * Queues Service — handwritten client over OpenAPI (post-codegen).
 */
import { apiClient } from '@/services/shared/infrastructure';
import { makeService } from '@/services/shared/infrastructure/service-wrapper';
import { unwrap } from '@/services/shared/http';

const raw = {
  /** List queues */
  async listQueues(params?: Record<string, string | number | boolean | undefined>, signal?: AbortSignal) {
    return unwrap(apiClient.get(`/v1/queues`, { params, signal }));
  },

  /** Register a queue */
  async registerQueue(body?: unknown, signal?: AbortSignal) {
    return unwrap(apiClient.post(`/v1/queues`, { body, signal }));
  },

  /** Get queue */
  async getQueue(queueId: string, params?: Record<string, string | number | boolean | undefined>, signal?: AbortSignal) {
    return unwrap(apiClient.get(`/v1/queues/${queueId}`, { params, signal }));
  },

  /** Pin policy definition */
  async pinPolicyDefinition(queueId: string, body?: unknown, signal?: AbortSignal) {
    return unwrap(apiClient.put(`/v1/queues/${queueId}/policy-definition`, { body, signal }));
  },

  /** Get current scorecard */
  async getQueueScorecard(queueId: string, params?: Record<string, string | number | boolean | undefined>, signal?: AbortSignal) {
    return unwrap(apiClient.get(`/v1/queues/${queueId}/scorecard`, { params, signal }));
  },

  /** Score a queue */
  async scoreQueue(queueId: string, body?: unknown, signal?: AbortSignal) {
    return unwrap(apiClient.post(`/v1/queues/${queueId}/scorecard`, { body, signal }));
  },

  /** Get threshold policy */
  async getThresholdPolicy(queueId: string, params?: Record<string, string | number | boolean | undefined>, signal?: AbortSignal) {
    return unwrap(apiClient.get(`/v1/queues/${queueId}/threshold-policy`, { params, signal }));
  },

  /** Set threshold policy */
  async setThresholdPolicy(queueId: string, body?: unknown, signal?: AbortSignal) {
    return unwrap(apiClient.put(`/v1/queues/${queueId}/threshold-policy`, { body, signal }));
  },

  /** Decide automation approval */
  async decideAutomationApproval(queueId: string, body?: unknown, signal?: AbortSignal) {
    return unwrap(apiClient.post(`/v1/governance/queues/${queueId}/automation-approval`, { body, signal }));
  }
};

export const queuesService = makeService(raw, 'queues');
