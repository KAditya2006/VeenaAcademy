import { Router } from "express";
import { authorize, protect } from "../middlewares/auth.middleware.js";
import { imageUpload } from "../middlewares/upload.middleware.js";
import { uploadController } from "../controllers/upload.controller.js";

export const uploadRouter = Router();
const manageRoles = ["super_admin", "admin", "content_manager"] as const;

uploadRouter.post("/image", protect, authorize(...manageRoles), imageUpload.single("file"), uploadController.image);
uploadRouter.delete("/:id", protect, authorize("super_admin", "admin"), uploadController.remove);
