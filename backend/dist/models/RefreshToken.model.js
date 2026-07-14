import crypto from "crypto";
import { Schema, model } from "mongoose";
const refreshTokenSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "AdminUser", required: true, index: true },
    tokenHash: { type: String, required: true, unique: true, index: true },
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
    revokedAt: { type: Date, default: null, index: true },
    createdByIp: { type: String },
    revokedByIp: { type: String },
    userAgent: { type: String },
}, { timestamps: true });
export function hashRefreshToken(token) {
    return crypto.createHash("sha256").update(token).digest("hex");
}
export const RefreshTokenModel = model("RefreshToken", refreshTokenSchema);
//# sourceMappingURL=RefreshToken.model.js.map