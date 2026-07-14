import { Types } from "mongoose";
import { AuditLogModel } from "../models/AuditLog.model.js";
export async function writeAuditLog({ userId, action, module = "auth", targetId, metadata, req }) {
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
//# sourceMappingURL=audit.service.js.map