import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { isProduction } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";

export function errorMiddleware(error: Error, _req: Request, res: Response, _next: NextFunction) {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({ success: false, message: error.message, errors: error.errors });
  }

  if (error instanceof ZodError) {
    return res.status(422).json({ success: false, message: "Validation failed", errors: error.issues });
  }

  const message = isProduction ? "Internal server error" : error.message;
  const errors = isProduction ? [] : [{ stack: error.stack }];
  return res.status(500).json({ success: false, message, errors });
}
