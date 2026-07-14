import { type HydratedDocument, type Model } from "mongoose";
import { type AdminRole, type SanitizedAdminUser } from "../types/index.js";
export type AdminUser = {
    name: string;
    email: string;
    password: string;
    role: AdminRole;
    avatar?: string | null;
    phone?: string;
    isActive: boolean;
    lastLoginAt?: Date | null;
    passwordChangedAt?: Date | null;
    failedLoginAttempts: number;
    lockUntil?: Date | null;
    createdAt: Date;
    updatedAt: Date;
};
export type AdminUserMethods = {
    comparePassword(candidate: string): Promise<boolean>;
    isLocked(): boolean;
    recordFailedLogin(): Promise<void>;
    resetFailedLogins(): Promise<void>;
    toSanitized(): SanitizedAdminUser;
};
export type AdminUserDocument = HydratedDocument<AdminUser, AdminUserMethods>;
type AdminUserModel = Model<AdminUser, {}, AdminUserMethods>;
export declare const AdminUserModel: AdminUserModel;
export {};
