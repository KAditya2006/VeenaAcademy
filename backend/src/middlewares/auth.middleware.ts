import type { NextFunction, Request, Response } from "express";
import { AdminUserModel } from "../models/AdminUser.model.js";
import type { AdminRole } from "../types/index.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyAccessToken } from "../services/token.service.js";

export const protect = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
  const header = req.get("authorization");
  if (!header?.startsWith("Bearer ")) throw new ApiError(401, "Authentication required");

  const token = header.slice(7);
  const payload = verifyAccessToken(token);
  const user = await AdminUserModel.findById(payload.sub);
  if (!user) throw new ApiError(401, "Admin user not found");
  if (!user.isActive) throw new ApiError(403, "This admin account is inactive");

  req.user = user;
  next();
});

export function authorize(...roles: AdminRole[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) return next(new ApiError(401, "Authentication required"));
    if (!roles.includes(req.user.role)) return next(new ApiError(403, "You do not have permission to access this resource"));
    return next();
  };
}
