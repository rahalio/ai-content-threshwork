'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  clearAuthTokens,
  getAccessToken,
  isAuthenticated as checkAuth,
  setApiKey,
  setAuthTokens,
} from '@/services/shared/infrastructure/auth-tokens';
import { setEffectiveTenantId } from '@/services/shared/infrastructure/tenant-state';
import { apiClient } from '@/services/shared/infrastructure/api-client';
import { unwrap } from '@/services/shared/http';
import {
  clearSessionOperator,
  setOperatorRole,
  setSessionOperator,
  type OperatorRole,
  type SessionOperator,
} from '@/lib/session';

type AuthContextValue = {
  ready: boolean;
  authenticated: boolean;
  signInWithApiKey: (
    apiKey: string,
    tenantLabel?: string,
    roleOverride?: OperatorRole,
  ) => Promise<void>;
  signInWithPassword: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function asOperator(raw: Record<string, unknown> | undefined): SessionOperator | null {
  if (!raw) return null;
  const role = String(raw.role ?? 'admin') as OperatorRole;
  return {
    userId: String(raw.userId ?? ''),
    email: String(raw.email ?? ''),
    displayName: String(raw.displayName ?? raw.email ?? 'Operator'),
    role,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(checkAuth());
    setReady(true);
  }, []);

  const signInWithApiKey = useCallback(
    async (
      apiKey: string,
      tenantLabel?: string,
      roleOverride?: OperatorRole,
    ) => {
      setApiKey(apiKey.trim());
      if (tenantLabel) setEffectiveTenantId(tenantLabel);
      const role = roleOverride ?? 'admin';
      setOperatorRole(role);
      try {
        const data = await unwrap<{
          operator?: Record<string, unknown>;
        }>(apiClient.get('/v0/auth/me'));
        const op = asOperator(data.operator);
        setSessionOperator(
          op ?? {
            userId: 'usr_api_key',
            email: 'api-key@threshwork.local',
            displayName: 'API key session',
            role,
          },
        );
      } catch {
        setSessionOperator({
          userId: 'usr_api_key',
          email: 'api-key@threshwork.local',
          displayName: 'API key session',
          role,
        });
      }
      setAuthenticated(true);
    },
    [],
  );

  const signInWithPassword = useCallback(
    async (email: string, password: string) => {
      const data = await unwrap<{
        accessToken?: string;
        refreshToken?: string;
        token?: string;
        operator?: Record<string, unknown>;
      }>(apiClient.post('/v0/auth/login', { body: { email, password } }));

      const access = data.accessToken ?? data.token;
      if (!access) throw new Error('Login did not return an access token');
      setAuthTokens({
        accessToken: access,
        refreshToken: data.refreshToken,
      });
      const op = asOperator(data.operator);
      setSessionOperator(
        op ?? {
          userId: 'usr_login',
          email,
          displayName: email,
          role: 'admin',
        },
      );
      setOperatorRole(op?.role ?? 'admin');
      setAuthenticated(true);
    },
    [],
  );

  const signOut = useCallback(() => {
    clearAuthTokens();
    clearSessionOperator();
    setAuthenticated(false);
    if (getAccessToken()) {
      /* no-op: tokens cleared */
    }
  }, []);

  const value = useMemo(
    () => ({
      ready,
      authenticated,
      signInWithApiKey,
      signInWithPassword,
      signOut,
    }),
    [ready, authenticated, signInWithApiKey, signInWithPassword, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
