import { createCmsController } from "./cms.controller.js";
import { resultService } from "../services/result.service.js";
export const resultController = createCmsController(resultService, { singular: "Result", plural: "Results" });
//# sourceMappingURL=result.controller.js.map