export declare const ADMIN_ROLES: readonly ["super_admin", "admin", "counsellor", "content_manager", "faculty"];
export type AdminRole = (typeof ADMIN_ROLES)[number];
export type AuthTokenPayload = {
    sub: string;
    role: AdminRole;
    tokenType: "access" | "refresh";
};
export type SanitizedAdminUser = {
    id: string;
    name: string;
    email: string;
    role: AdminRole;
    avatar: string | null;
    phone?: string;
    isActive: boolean;
};
export type MediaAsset = {
    publicId: string;
    secureUrl: string;
    width?: number;
    height?: number;
    format?: string;
    bytes?: number;
    altText?: string;
};
export type CmsStatus = "published" | "draft";
export type LinkedModule = "course" | "faculty" | "result" | "gallery" | "unassigned";
