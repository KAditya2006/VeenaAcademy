import { Schema, model } from "mongoose";
const auditLogSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "AdminUser", default: null, index: true },
    action: { type: String, required: true, index: true },
    module: { type: String, required: true, index: true },
    targetId: { type: String },
    metadata: { type: Schema.Types.Mixed },
    ipAddress: { type: String },
    userAgent: { type: String },
}, { timestamps: { createdAt: true, updatedAt: false } });
auditLogSchema.index({ createdAt: -1 });
export const AuditLogModel = model("AuditLog", auditLogSchema);
//# sourceMappingURL=AuditLog.model.js.map