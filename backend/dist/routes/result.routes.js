import { createCmsRouter } from "./cms.router.js";
import { resultController } from "../controllers/result.controller.js";
import { createResultSchema, updateResultSchema } from "../validations/result.validation.js";
export const resultRouter = createCmsRouter(resultController, { create: createResultSchema, update: updateResultSchema });
//# sourceMappingURL=result.routes.js.map