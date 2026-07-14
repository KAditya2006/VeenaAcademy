import { Readable } from "stream";
import { Types } from "mongoose";
import { env } from "../config/env.js";
import { getCloudinary } from "../config/cloudinary.js";
import { GalleryItemModel } from "../models/GalleryItem.model.js";
import { CourseModel } from "../models/Course.model.js";
import { FacultyModel } from "../models/Faculty.model.js";
import { ResultModel } from "../models/Result.model.js";
import { UploadModel } from "../models/Upload.model.js";
import { ApiError } from "../utils/ApiError.js";
import { writeAuditLog } from "./audit.service.js";
const folders = {
    course: "courses",
    faculty: "faculty",
    result: "results",
    gallery: "gallery",
    unassigned: "temp",
};
function uploadBuffer(file, folder) {
    const cloudinary = getCloudinary();
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder, resource_type: "image", use_filename: true, unique_filename: true }, (error, result) => {
            if (error || !result)
                return reject(new ApiError(502, "Image upload failed"));
            return resolve(result);
        });
        Readable.from(file.buffer).pipe(stream);
    });
}
export async function uploadImage(file, module, altText, req) {
    if (!file)
        throw new ApiError(422, "Image file is required");
    const folder = `${env.CLOUDINARY_FOLDER_ROOT}/${folders[module] ?? "temp"}`;
    const result = await uploadBuffer(file, folder);
    const upload = await UploadModel.create({
        publicId: result.public_id,
        secureUrl: result.secure_url,
        folder,
        originalFilename: file.originalname,
        format: result.format,
        mimeType: file.mimetype,
        bytes: result.bytes,
        width: result.width,
        height: result.height,
        altText,
        uploadedBy: req.user?._id,
        linkedModule: module,
    });
    await writeAuditLog({ userId: req.user?._id, action: "upload.created", module: "upload", targetId: String(upload._id), metadata: { linkedModule: module }, req });
    return upload;
}
async function isLinked(publicId) {
    const [course, faculty, result, gallery] = await Promise.all([
        CourseModel.exists({ "image.publicId": publicId, isDeleted: false }),
        FacultyModel.exists({ "photo.publicId": publicId, isDeleted: false }),
        ResultModel.exists({ "photo.publicId": publicId, isDeleted: false }),
        GalleryItemModel.exists({ "image.publicId": publicId, isDeleted: false }),
    ]);
    return Boolean(course || faculty || result || gallery);
}
export async function deleteUpload(id, req) {
    const upload = await UploadModel.findOne({ _id: new Types.ObjectId(id), isDeleted: false });
    if (!upload)
        throw new ApiError(404, "Upload not found");
    if (await isLinked(upload.publicId)) {
        await writeAuditLog({ userId: req.user?._id, action: "upload.delete.rejected_linked", module: "upload", targetId: id, req });
        throw new ApiError(409, "This image is linked to active content and cannot be deleted directly");
    }
    await getCloudinary().uploader.destroy(upload.publicId, { resource_type: "image" });
    upload.isDeleted = true;
    upload.deletedAt = new Date();
    await upload.save();
    await writeAuditLog({ userId: req.user?._id, action: "upload.deleted", module: "upload", targetId: id, req });
    return upload;
}
//# sourceMappingURL=upload.service.js.map