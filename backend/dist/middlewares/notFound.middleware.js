import { ApiError } from "../utils/ApiError.js";
export function notFoundMiddleware(req, _res, next) {
    next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}
//# sourceMappingURL=notFound.middleware.js.map