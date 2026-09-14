/**
 * Identity Service — handwritten client over OpenAPI (post-codegen).
 */
import { apiClient } from '@/services/shared/infrastructure';
import { makeService } from '@/services/shared/infrastructure/service-wrapper';
import { unwrap } from '@/services/shared/http';

const raw = {
  /** List API keys for the current tenant */
  async listTenantApiKeys(params?: Record<string, string | number | boolean | undefined>, signal?: AbortSignal) {
    return unwrap(apiClient.get(`/v0/tenants/me/api-keys`, { params, signal }));
  },

  /** Create an API key (secret returned once) */
  async createTenantApiKey(body?: unknown, signal?: AbortSignal) {
    return unwrap(apiClient.post(`/v0/tenants/me/api-keys`, { body, signal }));
  },

  /** Get API key metadata */
  async getTenantApiKey(keyId: string, params?: Record<string, string | number | boolean | undefined>, signal?: AbortSignal) {
    return unwrap(apiClient.get(`/v0/tenants/me/api-keys/${keyId}`, { params, signal }));
  },

  /** Revoke an API key */
  async revokeTenantApiKey(keyId: string, params?: Record<string, string | number | boolean | undefined>, signal?: AbortSignal) {
    return unwrap(apiClient.delete(`/v0/tenants/me/api-keys/${keyId}`, { params, signal }));
  },

  /** List operator users for the current tenant */
  async listTenantUsers(params?: Record<string, string | number | boolean | undefined>, signal?: AbortSignal) {
    return unwrap(apiClient.get(`/v0/tenants/me/users`, { params, signal }));
  },

  /** Create an operator user (password set once) */
  async createTenantUser(body?: unknown, signal?: AbortSignal) {
    return unwrap(apiClient.post(`/v0/tenants/me/users`, { body, signal }));
  },

  /** Get operator user metadata */
  async getTenantUser(userId: string, params?: Record<string, string | number | boolean | undefined>, signal?: AbortSignal) {
    return unwrap(apiClient.get(`/v0/tenants/me/users/${userId}`, { params, signal }));
  },

  /** Update display name, role, or reset password */
  async updateTenantUser(userId: string, body?: unknown, signal?: AbortSignal) {
    return unwrap(apiClient.patch(`/v0/tenants/me/users/${userId}`, { body, signal }));
  },

  /** Disable an operator user */
  async disableTenantUser(userId: string, body?: unknown, signal?: AbortSignal) {
    return unwrap(apiClient.post(`/v0/tenants/me/users/${userId}/disable`, { body, signal }));
  },

  /** Re-enable an operator user */
  async enableTenantUser(userId: string, body?: unknown, signal?: AbortSignal) {
    return unwrap(apiClient.post(`/v0/tenants/me/users/${userId}/enable`, { body, signal }));
  },

  /** Operator login (stub) */
  async operatorLogin(body?: unknown, signal?: AbortSignal) {
    return unwrap(apiClient.post(`/v0/auth/login`, { body, signal }));
  },

  /** Current operator session */
  async getOperatorMe(params?: Record<string, string | number | boolean | undefined>, signal?: AbortSignal) {
    return unwrap(apiClient.get(`/v0/auth/me`, { params, signal }));
  },

  /** Update own display name */
  async updateOperatorMe(body?: unknown, signal?: AbortSignal) {
    return unwrap(apiClient.patch(`/v0/auth/me`, { body, signal }));
  },

  /** Refresh operator tokens (stub) */
  async operatorRefresh(body?: unknown, signal?: AbortSignal) {
    return unwrap(apiClient.post(`/v0/auth/refresh`, { body, signal }));
  },

  /** Operator logout (stub) */
  async operatorLogout(body?: unknown, signal?: AbortSignal) {
    return unwrap(apiClient.post(`/v0/auth/logout`, { body, signal }));
  }
};

export const identityService = makeService(raw, 'identity');
