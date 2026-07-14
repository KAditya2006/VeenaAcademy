import bcrypt from "bcryptjs";
import { Schema, model, type HydratedDocument, type Model } from "mongoose";
import { ADMIN_ROLES, type AdminRole, type SanitizedAdminUser } from "../types/index.js";

const LOCK_MINUTES = 15;
const MAX_FAILED_ATTEMPTS = 5;

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

const adminUserSchema = new Schema<AdminUser, AdminUserModel, AdminUserMethods>({
  name: { type: String, required: true, trim: true, minlength: 2 },
  email: { type: String, required: true, trim: true, lowercase: true, unique: true, index: true },
  password: { type: String, required: true, select: false, minlength: 10 },
  role: { type: String, enum: ADMIN_ROLES, default: "admin", index: true },
  avatar: { type: String, default: null },
  phone: { type: String, trim: true },
  isActive: { type: Boolean, default: true, index: true },
  lastLoginAt: { type: Date, default: null },
  passwordChangedAt: { type: Date, default: null },
  failedLoginAttempts: { type: Number, default: 0 },
  lockUntil: { type: Date, default: null },
}, { timestamps: true });

adminUserSchema.pre("save", async function hashPassword() {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

adminUserSchema.methods.comparePassword = function comparePassword(candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

adminUserSchema.methods.isLocked = function isLocked() {
  return Boolean(this.lockUntil && this.lockUntil.getTime() > Date.now());
};

adminUserSchema.methods.recordFailedLogin = async function recordFailedLogin() {
  this.failedLoginAttempts += 1;
  if (this.failedLoginAttempts >= MAX_FAILED_ATTEMPTS) {
    this.lockUntil = new Date(Date.now() + LOCK_MINUTES * 60 * 1000);
  }
  await this.save();
};

adminUserSchema.methods.resetFailedLogins = async function resetFailedLogins() {
  this.failedLoginAttempts = 0;
  this.lockUntil = null;
  await this.save();
};

adminUserSchema.methods.toSanitized = function toSanitized() {
  return {
    id: this.id,
    name: this.name,
    email: this.email,
    role: this.role,
    avatar: this.avatar ?? null,
    phone: this.phone,
    isActive: this.isActive,
  };
};

adminUserSchema.set("toJSON", {
  transform(_doc, ret: Partial<AdminUser> & { __v?: number }) {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

export const AdminUserModel = model<AdminUser, AdminUserModel>("AdminUser", adminUserSchema);
