import type { CookieOptions, Response } from "express";
export declare function refreshCookieOptions(): CookieOptions;
export declare function setRefreshCookie(res: Response, token: string): void;
export declare function clearRefreshCookie(res: Response): void;
