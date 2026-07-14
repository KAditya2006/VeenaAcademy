import type { NextFunction, Request, Response } from "express";
import type { AdminRole } from "../types/index.js";
export declare const protect: (req: Request, res: Response, next: NextFunction) => void;
export declare function authorize(...roles: AdminRole[]): (req: Request, _res: Response, next: NextFunction) => void;
