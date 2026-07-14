import { Router } from "express";
import { getDatabaseStatus } from "../config/database.js";
import { env } from "../config/env.js";
import { sendSuccess } from "../utils/ApiResponse.js";

export const healthRouter = Router();

healthRouter.get("/", (_req, res) => {
  return sendSuccess(res, 200, "Veena Academy API is running", {
    status: "healthy",
    environment: env.NODE_ENV,
    database: getDatabaseStatus(),
    timestamp: new Date().toISOString(),
  });
});
