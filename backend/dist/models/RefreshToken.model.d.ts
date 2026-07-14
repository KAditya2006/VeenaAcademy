import { type Types } from "mongoose";
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
export declare function hashRefreshToken(token: string): string;
export declare const RefreshTokenModel: import("mongoose").Model<RefreshToken, {}, {}, {}, import("mongoose").Document<unknown, {}, RefreshToken, {}, import("mongoose").DefaultSchemaOptions> & RefreshToken & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, RefreshToken>;
