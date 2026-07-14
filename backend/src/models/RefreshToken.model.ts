import crypto from "crypto";
import { Schema, model, type Types } from "mongoose";

export type RefreshToken = {
  userId: Types.ObjectId;
  tokenHash: string;
  expiresAt: Date;
  revokedAt?: Date | null;
  createdByIp?: string;
  revokedByIp?: string;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
};

const refreshTokenSchema = new Schema<RefreshToken>({
  userId: { type: Schema.Types.ObjectId, ref: "AdminUser", required: true, index: true },
  tokenHash: { type: String, required: true, unique: true, index: true },
  expiresAt: { type: Date, required: true, index: { expires: 0 } },
  revokedAt: { type: Date, default: null, index: true },
  createdByIp: { type: String },
  revokedByIp: { type: String },
  userAgent: { type: String },
}, { timestamps: true });

export function hashRefreshToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export const RefreshTokenModel = model<RefreshToken>("RefreshToken", refreshTokenSchema);
