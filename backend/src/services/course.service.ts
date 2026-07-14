import { CourseModel } from "../models/Course.model.js";
import { createCmsService } from "./cms.service.js";
export const courseService = createCmsService({ module: "course", model: CourseModel, searchFields: ["title", "shortDescription", "category"], filterFields: ["category"], defaultSort: "sortOrder" });
