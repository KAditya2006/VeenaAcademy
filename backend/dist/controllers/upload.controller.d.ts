import type { Request, Response } from "express";
export declare const uploadController: {
    image: (req: Request, res: Response, next: import("express").NextFunction) => void;
    remove: (req: Request, res: Response, next: import("express").NextFunction) => void;
};
