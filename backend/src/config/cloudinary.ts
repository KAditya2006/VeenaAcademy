import { v2 as cloudinary } from "cloudinary";
import { env, isTest } from "./env.js";
import { ApiError } from "../utils/ApiError.js";

export function configureCloudinary() {
  if (!env.CLOUDINARY_CLOUD_NAME || !env.CLOUDINARY_API_KEY || !env.CLOUDINARY_API_SECRET) {
    if (isTest) return;
    console.warn("Cloudinary is not configured. Upload endpoints will fail until credentials are provided.");
    return;
  }

  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

export function getCloudinary() {
  if (!env.CLOUDINARY_CLOUD_NAME || !env.CLOUDINARY_API_KEY || !env.CLOUDINARY_API_SECRET) {
    throw new ApiError(503, "Cloudinary is not configured");
  }
  return cloudinary;
}
