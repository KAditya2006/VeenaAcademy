import { createCmsController } from "./cms.controller.js";
import { facultyService } from "../services/faculty.service.js";
export const facultyController = createCmsController(facultyService, { singular: "Faculty", plural: "Faculty" });
//# sourceMappingURL=faculty.controller.js.map