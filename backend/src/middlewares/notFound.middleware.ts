import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";

export function notFoundMiddleware(req: Request, _res: Response, next: NextFunction) {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}
