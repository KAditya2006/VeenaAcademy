import type { NextFunction, Request, Response } from "express";
export declare function errorMiddleware(error: Error, _req: Request, res: Response, _next: NextFunction): Response<any, Record<string, any>>;
