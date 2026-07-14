import type { AdminUser } from "../types";

type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
  errors?: Array<{ path?: string; message?: string }>;
};

type BackendUser = {
  id: string;
  name: string;
  email: string;
  role: AdminUser["role"];
  avatar: string | null;
  isActive: boolean;
};

type AuthPayload = {
  user: BackendUser;
  accessToken: string;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000/api/v1";

let accessToken: string | null = null;
let refreshPromise: Promise<string | null> | null = null;
let onUnauthorized: (() => void) | null = null;

function initials(name: string) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "VA";
}

function mapUser(user: BackendUser): AdminUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    avatarInitials: initials(user.name),
    status: user.isActive ? "Active" : "Inactive",
    isActive: user.isActive,
  };
}

export class AdminApiError extends Error {
  status: number;
  errors: unknown[];

  constructor(status: number, message: string, errors: unknown[] = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

export function setAdminAccessToken(token: string | null) {
  accessToken = token;
}

export function getAdminAccessToken() {
  return accessToken;
}

export function setUnauthorizedHandler(handler: (() => void) | null) {
  onUnauthorized = handler;
}

async function parseResponse<T>(response: Response): Promise<ApiEnvelope<T>> {
  const payload = await response.json().catch(() => null) as ApiEnvelope<T> | null;
  if (!payload) throw new AdminApiError(response.status, "Unexpected server response");
  if (!response.ok || !payload.success) throw new AdminApiError(response.status, payload.message || "Request failed", payload.errors ?? []);
  return payload;
}

async function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = fetch(`${API_BASE_URL}/auth/refresh`, { method: "POST", credentials: "include" })
      .then(async (response) => {
        const payload = await parseResponse<AuthPayload>(response);
        accessToken = payload.data.accessToken;
        return accessToken;
      })
      .catch(() => {
        accessToken = null;
        return null;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

export async function adminRequest<T>(path: string, options: RequestInit = {}, retry = true): Promise<ApiEnvelope<T>> {
  const headers = new Headers(options.headers);
  if (!(options.body instanceof FormData)) headers.set("Content-Type", "application/json");
  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });

  if (response.status === 401 && retry) {
    const refreshed = await refreshAccessToken();
    if (refreshed) return adminRequest<T>(path, options, false);
    onUnauthorized?.();
  }

  return parseResponse<T>(response);
}

export const adminAuthApi = {
  async login(email: string, password: string, rememberMe: boolean) {
    const payload = await adminRequest<AuthPayload>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password, rememberMe }),
    }, false);
    accessToken = payload.data.accessToken;
    return { user: mapUser(payload.data.user), accessToken: payload.data.accessToken };
  },
  async refreshSession() {
    const token = await refreshAccessToken();
    if (!token) return null;
    const payload = await adminRequest<{ user: BackendUser }>("/auth/me", {}, false);
    return { user: mapUser(payload.data.user), accessToken: token };
  },
  async getCurrentUser() {
    const payload = await adminRequest<{ user: BackendUser }>("/auth/me");
    return mapUser(payload.data.user);
  },
  async logout() {
    await adminRequest<Record<string, never>>("/auth/logout", { method: "POST" }, false).catch(() => undefined);
    accessToken = null;
  },
  async changePassword(currentPassword: string, newPassword: string, confirmPassword: string) {
    await adminRequest<Record<string, never>>("/auth/change-password", {
      method: "POST",
      body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
    });
    accessToken = null;
  },
};

