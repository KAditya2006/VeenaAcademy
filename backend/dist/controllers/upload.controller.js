import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/ApiResponse.js";
import { uploadImage, deleteUpload } from "../services/upload.service.js";
const modules = new Set(["course", "faculty", "result", "gallery", "unassigned"]);
export const uploadController = {
    image: asyncHandler(async (req, res) => {
        const requested = typeof req.body.module === "string" && modules.has(req.body.module) ? req.body.module : "unassigned";
        const upload = await uploadImage(req.file, requested, typeof req.body.altText === "string" ? req.body.altText : undefined, req);
        return sendSuccess(res, 201, "Image uploaded successfully", {
            id: upload.id,
            publicId: upload.publicId,
            secureUrl: upload.secureUrl,
            width: upload.width,
            height: upload.height,
            format: upload.format,
            bytes: upload.bytes,
            altText: upload.altText,
        });
    }),
    remove: asyncHandler(async (req, res) => {
        await deleteUpload(String(req.params.id), req);
        return sendSuccess(res, 200, "Image deleted successfully", {});
    }),
};
//# sourceMappingURL=upload.controller.js.map