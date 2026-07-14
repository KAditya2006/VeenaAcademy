import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";
import { ApiError } from "../utils/ApiError.js";

type RequestParts = {
  body?: unknown;
  query?: unknown;
  params?: unknown;
};

export function validate(schema: ZodSchema<RequestParts>) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse({ body: req.body, query: req.query, params: req.params });
    if (!result.success) {
      return next(new ApiError(422, "Validation failed", result.error.issues.map((issue) => ({ path: issue.path.join("."), message: issue.message }))));
    }
    if (result.data.body) req.body = result.data.body;
    return next();
  };
}
