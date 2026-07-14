import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";
type RequestParts = {
    body?: unknown;
    query?: unknown;
    params?: unknown;
};
export declare function validate(schema: ZodSchema<RequestParts>): (req: Request, _res: Response, next: NextFunction) => void;
export {};
