import type { Request } from "express";
import { Types } from "mongoose";
type AuditInput = {
    userId?: string | Types.ObjectId | null;
    action: string;
    module?: string;
    targetId?: string;
    metadata?: Record<string, unknown>;
    req?: Request;
};
export declare function writeAuditLog({ userId, action, module, targetId, metadata, req }: AuditInput): Promise<void>;
export {};
