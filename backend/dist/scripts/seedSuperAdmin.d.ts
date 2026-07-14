export declare function seedSuperAdmin(): Promise<import("mongoose").Document<unknown, {}, import("../models/AdminUser.model.js").AdminUser, {}, import("mongoose").DefaultSchemaOptions> & Omit<import("../models/AdminUser.model.js").AdminUser & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, keyof import("../models/AdminUser.model.js").AdminUserMethods | "id"> & import("mongoose").HydratedDocumentOverrides<import("../models/AdminUser.model.js").AdminUserMethods & {
    id: string;
}>>;
