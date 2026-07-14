import { createCmsRouter } from "./cms.router.js";
import { courseController } from "../controllers/course.controller.js";
import { createCourseSchema, updateCourseSchema } from "../validations/course.validation.js";
export const courseRouter = createCmsRouter(courseController, { create: createCourseSchema, update: updateCourseSchema }, { publicDetail: true });
//# sourceMappingURL=course.routes.js.map