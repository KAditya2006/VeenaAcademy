import { env } from "../config/env.js";
import { changeAdminPassword, loginAdmin, logoutAdmin, refreshAdminSession } from "../services/auth.service.js";
import { sendSuccess } from "../utils/ApiResponse.js";
import { clearRefreshCookie, setRefreshCookie } from "../utils/cookies.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
export const login = asyncHandler(async (req, res) => {
    const { email, password, rememberMe } = req.body;
    const result = await loginAdmin(email, password, Boolean(rememberMe), req);
    setRefreshCookie(res, result.refreshToken);
    return sendSuccess(res, 200, "Login successful", { user: result.user, accessToken: result.accessToken });
});
export const refresh = asyncHandler(async (req, res) => {
    const token = req.cookies?.[env.REFRESH_COOKIE_NAME];
    if (!token)
        throw new ApiError(401, "Refresh session missing");
    const result = await refreshAdminSession(token, req);
    setRefreshCookie(res, result.refreshToken);
    return sendSuccess(res, 200, "Session refreshed", { user: result.user, accessToken: result.accessToken });
});
export const logout = asyncHandler(async (req, res) => {
    await logoutAdmin(req.cookies?.[env.REFRESH_COOKIE_NAME], req);
    clearRefreshCookie(res);
    return sendSuccess(res, 200, "Logout successful", {});
});
export const me = asyncHandler(async (req, res) => {
    if (!req.user)
        throw new ApiError(401, "Authentication required");
    return sendSuccess(res, 200, "Current admin user", { user: req.user.toSanitized() });
});
export const changePassword = asyncHandler(async (req, res) => {
    if (!req.user)
        throw new ApiError(401, "Authentication required");
    await changeAdminPassword(req.user, req.body.currentPassword, req.body.newPassword, req);
    clearRefreshCookie(res);
    return sendSuccess(res, 200, "Password changed. Please log in again.", {});
});
//# sourceMappingURL=auth.controller.js.map