import multer from "multer";
import path from "path";
import { env } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";
const allowedMimeTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const allowedExts = new Set([".jpg", ".jpeg", ".png", ".webp"]);
export const imageUpload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: env.MAX_IMAGE_SIZE_MB * 1024 * 1024, files: 1 },
    fileFilter(_req, file, cb) {
        const ext = path.extname(file.originalname).toLowerCase();
        if (!allowedMimeTypes.has(file.mimetype) || !allowedExts.has(ext)) {
            return cb(new ApiError(422, "Unsupported image type. Use JPG, PNG, or WebP."));
        }
        return cb(null, true);
    },
});
//# sourceMappingURL=upload.middleware.js.map