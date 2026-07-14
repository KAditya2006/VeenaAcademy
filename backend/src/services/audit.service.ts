import type { Request } from "express";
import { Types } from "mongoose";
import { AuditLogModel } from "../models/AuditLog.model.js";

type AuditInput = {
  userId?: string | Types.ObjectId | null;
  action: string;
  module?: string;
  targetId?: string;
  metadata?: Record<string, unknown>;
  req?: Request;
};

export async function writeAuditLog({ userId, action, module = "auth", targetId, metadata, req }: AuditInput) {
  const safeMetadata = { ...(metadata ?? {}) };
  delete safeMetadata.password;
  delete safeMetadata.currentPassword;
  delete safeMetadata.newPassword;
  delete safeMetadata.confirmPassword;
  delete safeMetadata.accessToken;
  delete safeMetadata.refreshToken;

  await AuditLogModel.create({
    userId: userId ? new Types.ObjectId(String(userId)) : null,
    action,
    module,
    targetId,
    metadata: safeMetadata,
    ipAddress: req?.ip,
    userAgent: req?.get("user-agent"),
  });
}
