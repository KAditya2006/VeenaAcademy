import { sendSuccess } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
export function createCmsController(service, labels) {
    return {
        listAdmin: asyncHandler(async (req, res) => {
            const result = await service.listAdmin(req.query);
            return res.status(200).json({ success: true, message: `${labels.plural} fetched successfully`, data: result.records, pagination: result.pagination });
        }),
        listPublic: asyncHandler(async (req, res) => {
            const result = await service.listPublic(req.query, 50);
            return res.status(200).json({ success: true, message: `${labels.plural} fetched successfully`, data: result.records, pagination: result.pagination });
        }),
        getAdmin: asyncHandler(async (req, res) => sendSuccess(res, 200, `${labels.singular} fetched successfully`, await service.getAdmin(String(req.params.id)))),
        getPublicBySlug: asyncHandler(async (req, res) => {
            if (!service.getPublicBySlug)
                return sendSuccess(res, 404, `${labels.singular} not found`, {});
            return sendSuccess(res, 200, `${labels.singular} fetched successfully`, await service.getPublicBySlug(String(req.params.slug)));
        }),
        create: asyncHandler(async (req, res) => sendSuccess(res, 201, `${labels.singular} created successfully`, await service.create(req.body, req))),
        update: asyncHandler(async (req, res) => sendSuccess(res, 200, `${labels.singular} updated successfully`, await service.update(String(req.params.id), req.body, req))),
        remove: asyncHandler(async (req, res) => sendSuccess(res, 200, `${labels.singular} deleted successfully`, await service.softDelete(String(req.params.id), req))),
        publish: asyncHandler(async (req, res) => sendSuccess(res, 200, `${labels.singular} publish state updated`, await service.publish(String(req.params.id), req.body.value, req))),
        feature: asyncHandler(async (req, res) => sendSuccess(res, 200, `${labels.singular} featured state updated`, await service.feature(String(req.params.id), req.body.value, req))),
        reorder: asyncHandler(async (req, res) => sendSuccess(res, 200, `${labels.plural} reordered successfully`, await service.reorder(req.body.items, req))),
    };
}
//# sourceMappingURL=cms.controller.js.map