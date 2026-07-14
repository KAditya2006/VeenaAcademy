export declare class ApiError extends Error {
    statusCode: number;
    errors: unknown[];
    isOperational: boolean;
    constructor(statusCode: number, message: string, errors?: unknown[]);
}
