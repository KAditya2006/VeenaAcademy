import { env, isProduction } from "../config/env.js";
export function refreshCookieOptions() {
    return {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        path: "/api/v1/auth",
    };
}
export function setRefreshCookie(res, token) {
    res.cookie(env.REFRESH_COOKIE_NAME, token, refreshCookieOptions());
}
export function clearRefreshCookie(res) {
    res.clearCookie(env.REFRESH_COOKIE_NAME, refreshCookieOptions());
}
//# sourceMappingURL=cookies.js.map