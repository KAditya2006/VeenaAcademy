export class ApiResponse {
    success = true;
    message;
    data;
    constructor(message, data) {
        this.message = message;
        this.data = data;
    }
}
export function sendSuccess(res, statusCode, message, data) {
    return res.status(statusCode).json(new ApiResponse(message, data));
}
//# sourceMappingURL=ApiResponse.js.map