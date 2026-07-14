import type { Response } from "express";
export declare class ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    constructor(message: string, data: T);
}
export declare function sendSuccess<T>(res: Response, statusCode: number, message: string, data: T): Response<any, Record<string, any>>;
