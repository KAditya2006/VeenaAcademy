import { Schema, model, type Types } from "mongoose";

export type AuditLog = {
  userId?: Types.ObjectId | null;
  action: string;
  module: string;
  targetId?: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
};

const auditLogSchema = new Schema<AuditLog>({
  userId: { type: Schema.Types.ObjectId, ref: "AdminUser", default: null, index: true },
  action: { type: String, required: true, index: true },
  module: { type: String, required: true, index: true },
  targetId: { type: String },
  metadata: { type: Schema.Types.Mixed },
  ipAddress: { type: String },
  userAgent: { type: String },
}, { timestamps: { createdAt: true, updatedAt: false } });

auditLogSchema.index({ createdAt: -1 });

export const AuditLogModel = model<AuditLog>("AuditLog", auditLogSchema);
