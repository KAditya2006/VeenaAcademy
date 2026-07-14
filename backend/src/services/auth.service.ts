import type { Request } from "express";
import { AdminUserModel, type AdminUserDocument } from "../models/AdminUser.model.js";
import { ApiError } from "../utils/ApiError.js";
import { writeAuditLog } from "./audit.service.js";
import { createAccessToken, createRefreshJwt, findStoredRefreshToken, revokeAllUserRefreshTokens, revokeRefreshToken, rotateRefreshToken, storeRefreshToken, verifyRefreshToken } from "./token.service.js";

const GENERIC_LOGIN_ERROR = "Invalid email or password";

export async function loginAdmin(email: string, password: string, rememberMe: boolean, req: Request) {
  const normalizedEmail = email.trim().toLowerCase();
  const user = await AdminUserModel.findOne({ email: normalizedEmail }).select("+password");

  if (!user) {
    await writeAuditLog({ action: "auth.login.failed", metadata: { email: normalizedEmail, reason: "invalid_credentials" }, req });
    throw new ApiError(401, GENERIC_LOGIN_ERROR);
  }

  if (!user.isActive) {
    await writeAuditLog({ userId: user.id, action: "auth.login.failed", metadata: { reason: "inactive" }, req });
    throw new ApiError(403, "This admin account is inactive");
  }

  if (user.isLocked()) {
    await writeAuditLog({ userId: user.id, action: "auth.login.failed", metadata: { reason: "locked" }, req });
    throw new ApiError(423, "This account is temporarily locked. Please try again later.");
  }

  const passwordMatches = await user.comparePassword(password);
  if (!passwordMatches) {
    await user.recordFailedLogin();
    await writeAuditLog({ userId: user.id, action: "auth.login.failed", metadata: { reason: "invalid_credentials", failedLoginAttempts: user.failedLoginAttempts }, req });
    if (user.isLocked()) {
      await writeAuditLog({ userId: user.id, action: "auth.account.locked", metadata: { failedLoginAttempts: user.failedLoginAttempts }, req });
    }
    throw new ApiError(401, GENERIC_LOGIN_ERROR);
  }

  await user.resetFailedLogins();
  user.lastLoginAt = new Date();
  await user.save();

  const accessToken = createAccessToken(user.id, user.role);
  const refreshToken = createRefreshJwt(user.id, user.role);
  await storeRefreshToken(refreshToken, user.id, req.ip, req.get("user-agent"));
  await writeAuditLog({ userId: user.id, action: "auth.login.success", metadata: { rememberMe }, req });

  return { user: user.toSanitized(), accessToken, refreshToken };
}

export async function refreshAdminSession(refreshToken: string, req: Request) {
  const payload = verifyRefreshToken(refreshToken);
  const stored = await findStoredRefreshToken(refreshToken);
  if (!stored) throw new ApiError(401, "Refresh session not found");
  if (stored.revokedAt) {
    await revokeAllUserRefreshTokens(String(stored.userId), req.ip);
    throw new ApiError(401, "Refresh session was revoked");
  }

  const user = await AdminUserModel.findById(payload.sub);
  if (!user) throw new ApiError(401, "Admin user not found");
  if (!user.isActive) throw new ApiError(403, "This admin account is inactive");

  const nextRefreshToken = await rotateRefreshToken(refreshToken, user.role, req.ip, req.get("user-agent"));
  const accessToken = createAccessToken(user.id, user.role);
  await writeAuditLog({ userId: user.id, action: "auth.refresh", req });

  return { user: user.toSanitized(), accessToken, refreshToken: nextRefreshToken };
}

export async function logoutAdmin(refreshToken: string | undefined, req: Request) {
  if (refreshToken) {
    const stored = await revokeRefreshToken(refreshToken, req.ip);
    if (stored?.userId) {
      await writeAuditLog({ userId: stored.userId, action: "auth.logout", req });
    }
  }
}

export async function changeAdminPassword(user: AdminUserDocument, currentPassword: string, newPassword: string, req: Request) {
  const userWithPassword = await AdminUserModel.findById(user.id).select("+password");
  if (!userWithPassword) throw new ApiError(404, "Admin user not found");

  const currentMatches = await userWithPassword.comparePassword(currentPassword);
  if (!currentMatches) throw new ApiError(400, "Current password is incorrect");

  const reused = await userWithPassword.comparePassword(newPassword);
  if (reused) throw new ApiError(400, "New password must be different from the current password");

  userWithPassword.password = newPassword;
  userWithPassword.passwordChangedAt = new Date();
  await userWithPassword.save();
  await revokeAllUserRefreshTokens(userWithPassword.id, req.ip);
  await writeAuditLog({ userId: userWithPassword.id, action: "auth.password.changed", req });
}
