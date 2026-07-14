import type { Response } from "express";

export class ApiResponse<T> {
  success = true;
  message: string;
  data: T;

  constructor(message: string, data: T) {
    this.message = message;
    this.data = data;
  }
}

export function sendSuccess<T>(res: Response, statusCode: number, message: string, data: T) {
  return res.status(statusCode).json(new ApiResponse(message, data));
}
