import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { AdminRole, AdminUser, PermissionKey } from "../types";
import { rolePermissions } from "../data/mockAdmin";
import { adminAuthApi, setAdminAccessToken, setUnauthorizedHandler } from "./apiClient";

type ChangePasswordInput = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type AuthContextValue = {
  user: AdminUser | null;
  accessToken: string | null;
  rememberMe: boolean;
  isAuthenticated: boolean;
  isInitializing: boolean;
  authError: string | null;
  login: (email: string, password: string, remember: boolean) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  getCurrentUser: () => Promise<AdminUser | null>;
  changePassword: (input: ChangePasswordInput) => Promise<void>;
  hasRole: (...roles: AdminRole[]) => boolean;
  hasPermission: (permission?: PermissionKey) => boolean;
  setRolePreview: (role: AdminRole) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(true);
  const [isInitializing, setIsInitializing] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const clearSession = useCallback(() => {
    setUser(null);
    setAccessToken(null);
    setAdminAccessToken(null);
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(clearSession);
    return () => setUnauthorizedHandler(null);
  }, [clearSession]);

  const refreshSession = useCallback(async () => {
    setAuthError(null);
    const session = await adminAuthApi.refreshSession();
    if (session) {
      setUser(session.user);
      setAccessToken(session.accessToken);
      setAdminAccessToken(session.accessToken);
    } else {
      clearSession();
    }
  }, [clearSession]);

  useEffect(() => {
    refreshSession()
      .catch(() => clearSession())
      .finally(() => setIsInitializing(false));
  }, [clearSession, refreshSession]);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    accessToken,
    rememberMe,
    isAuthenticated: Boolean(user && accessToken),
    isInitializing,
    authError,
    async login(email, password, remember) {
      setAuthError(null);
      setRememberMe(remember);
      try {
        const result = await adminAuthApi.login(email, password, remember);
        setUser(result.user);
        setAccessToken(result.accessToken);
        setAdminAccessToken(result.accessToken);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Login failed. Please try again.";
        setAuthError(message);
        throw error;
      }
    },
    async logout() {
      await adminAuthApi.logout();
      clearSession();
    },
    refreshSession,
    async getCurrentUser() {
      const current = await adminAuthApi.getCurrentUser();
      setUser(current);
      return current;
    },
    async changePassword(input) {
      await adminAuthApi.changePassword(input.currentPassword, input.newPassword, input.confirmPassword);
      clearSession();
    },
    hasRole(...roles) {
      return Boolean(user && roles.includes(user.role));
    },
    hasPermission(permission) {
      if (!permission) return true;
      if (!user) return false;
      return rolePermissions[user.role].includes(permission);
    },
    setRolePreview(role) {
      setUser((current) => current ? { ...current, role } : current);
    },
  }), [accessToken, authError, clearSession, isInitializing, refreshSession, rememberMe, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAdminAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  return context;
}
