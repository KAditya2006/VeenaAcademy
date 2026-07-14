import { createCmsRouter } from "./cms.router.js";
import { facultyController } from "../controllers/faculty.controller.js";
import { createFacultySchema, updateFacultySchema } from "../validations/faculty.validation.js";
export const facultyRouter = createCmsRouter(facultyController, { create: createFacultySchema, update: updateFacultySchema }, { publicDetail: true });
