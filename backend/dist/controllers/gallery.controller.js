import { createCmsController } from "./cms.controller.js";
import { galleryService } from "../services/gallery.service.js";
export const galleryController = createCmsController(galleryService, { singular: "Gallery item", plural: "Gallery items" });
//# sourceMappingURL=gallery.controller.js.map