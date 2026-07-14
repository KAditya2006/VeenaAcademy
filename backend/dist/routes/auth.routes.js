import { Router } from "express";
import { changePassword, login, logout, me, refresh } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { loginLimiter, refreshLimiter } from "../middlewares/rateLimit.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { changePasswordSchema, loginSchema } from "../validations/auth.validation.js";
export const authRouter = Router();
authRouter.post("/login", loginLimiter, validate(loginSchema), login);
authRouter.post("/refresh", refreshLimiter, refresh);
authRouter.post("/logout", logout);
authRouter.get("/me", protect, me);
authRouter.post("/change-password", protect, validate(changePasswordSchema), changePassword);
//# sourceMappingURL=auth.routes.js.map