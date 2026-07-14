import { FacultyModel } from "../models/Faculty.model.js";
import { createCmsService } from "./cms.service.js";
export const facultyService = createCmsService({ module: "faculty", model: FacultyModel, searchFields: ["name", "subject", "qualification"], filterFields: ["subject"], publicFields: "-email -phone", defaultSort: "sortOrder" });
//# sourceMappingURL=faculty.service.js.map