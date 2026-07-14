import type { AdminUserDocument } from "../models/AdminUser.model.js";

declare global {
  namespace Express {
    interface Request {
      user?: AdminUserDocument;
    }
  }
}

export {};
