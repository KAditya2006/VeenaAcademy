import type { Request } from "express";
import { type AdminUserDocument } from "../models/AdminUser.model.js";
export declare function loginAdmin(email: string, password: string, rememberMe: boolean, req: Request): Promise<{
    user: import("../types/index.js").SanitizedAdminUser;
    accessToken: string;
    refreshToken: string;
}>;
export declare function refreshAdminSession(refreshToken: string, req: Request): Promise<{
    user: import("../types/index.js").SanitizedAdminUser;
    accessToken: string;
    refreshToken: string;
}>;
export declare function logoutAdmin(refreshToken: string | undefined, req: Request): Promise<void>;
export declare function changeAdminPassword(user: AdminUserDocument, currentPassword: string, newPassword: string, req: Request): Promise<void>;
