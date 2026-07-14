import { ApiError } from "../utils/ApiError.js";
export function validate(schema) {
    return (req, _res, next) => {
        const result = schema.safeParse({ body: req.body, query: req.query, params: req.params });
        if (!result.success) {
            return next(new ApiError(422, "Validation failed", result.error.issues.map((issue) => ({ path: issue.path.join("."), message: issue.message }))));
        }
        if (result.data.body)
            req.body = result.data.body;
        return next();
    };
}
//# sourceMappingURL=validate.middleware.js.map