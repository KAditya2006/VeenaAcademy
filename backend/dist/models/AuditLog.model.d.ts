import { type Types } from "mongoose";
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
export declare const AuditLogModel: import("mongoose").Model<AuditLog, {}, {}, {}, import("mongoose").Document<unknown, {}, AuditLog, {}, import("mongoose").DefaultSchemaOptions> & AuditLog & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, AuditLog>;
