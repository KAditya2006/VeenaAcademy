import { ResultModel } from "../models/Result.model.js";
import { createCmsService } from "./cms.service.js";
export const resultService = createCmsService({ module: "result", model: ResultModel, searchFields: ["studentName", "examName", "achievement"], filterFields: ["examName", "year", "course"], defaultSort: "sortOrder" });
//# sourceMappingURL=result.service.js.map