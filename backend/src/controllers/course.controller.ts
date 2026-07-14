import { createCmsController } from "./cms.controller.js";
import { courseService } from "../services/course.service.js";
export const courseController = createCmsController(courseService, { singular: "Course", plural: "Courses" });
