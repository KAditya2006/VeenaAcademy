import { Types } from "mongoose";
import type { AdminRole, AuthTokenPayload } from "../types/index.js";
export declare function createAccessToken(userId: string, role: AdminRole): string;
export declare function createRefreshJwt(userId: string, role: AdminRole): string;
export declare function verifyAccessToken(token: string): AuthTokenPayload;
export declare function verifyRefreshToken(token: string): AuthTokenPayload;
export declare function storeRefreshToken(token: string, userId: string, ip?: string, userAgent?: string): Promise<import("mongoose").Document<unknown, {}, import("../models/RefreshToken.model.js").RefreshToken, {}, import("mongoose").DefaultSchemaOptions> & import("../models/RefreshToken.model.js").RefreshToken & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}>;
export declare function findStoredRefreshToken(token: string): Promise<(import("mongoose").Document<unknown, {}, import("../models/RefreshToken.model.js").RefreshToken, {}, import("mongoose").DefaultSchemaOptions> & import("../models/RefreshToken.model.js").RefreshToken & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | null>;
export declare function revokeRefreshToken(token: string, ip?: string): Promise<(import("mongoose").Document<unknown, {}, import("../models/RefreshToken.model.js").RefreshToken, {}, import("mongoose").DefaultSchemaOptions> & import("../models/RefreshToken.model.js").RefreshToken & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | null>;
export declare function revokeAllUserRefreshTokens(userId: string, ip?: string): Promise<void>;
export declare function rotateRefreshToken(currentToken: string, role: AdminRole, ip?: string, userAgent?: string): Promise<string>;
