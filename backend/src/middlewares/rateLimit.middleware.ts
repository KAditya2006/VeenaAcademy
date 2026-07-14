import rateLimit from "express-rate-limit";

function standardLimitMessage(message: string) {
  return { success: false, message, errors: [] };
}

export const globalApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 600,
  standardHeaders: true,
  legacyHeaders: false,
  message: standardLimitMessage("Too many requests. Please try again later."),
});

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: standardLimitMessage("Too many login attempts. Please try again later."),
});

export const refreshLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: standardLimitMessage("Too many session refresh attempts. Please try again later."),
});
