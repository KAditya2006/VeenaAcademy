import { PassThrough } from "stream";
import { vi, describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
vi.mock("cloudinary", () => ({
    v2: {
        config: vi.fn(),
        uploader: {
            upload_stream: vi.fn((_options, cb) => {
                const stream = new PassThrough();
                stream.on("finish", () => cb(null, { public_id: "veena-academy/courses/test", secure_url: "https://res.cloudinary.com/demo/image/upload/test.webp", width: 1200, height: 800, format: "webp", bytes: 12345 }));
                return stream;
            }),
            destroy: vi.fn().mockResolvedValue({ result: "ok" }),
        },
    },
}));
import { createApp } from "../app.js";
import { AdminUserModel } from "../models/AdminUser.model.js";
import { CourseModel } from "../models/Course.model.js";
import { FacultyModel } from "../models/Faculty.model.js";
import { ResultModel } from "../models/Result.model.js";
import { UploadModel } from "../models/Upload.model.js";
import { createAccessToken } from "../services/token.service.js";
let mongo;
const app = createApp();
beforeAll(async () => {
    process.env.CLOUDINARY_CLOUD_NAME = "demo";
    process.env.CLOUDINARY_API_KEY = "key";
    process.env.CLOUDINARY_API_SECRET = "secret";
    mongo = await MongoMemoryServer.create();
    await mongoose.connect(mongo.getUri());
});
afterAll(async () => {
    await mongoose.disconnect();
    await mongo.stop();
});
beforeEach(async () => {
    await mongoose.connection.db?.dropDatabase();
});
async function token(role = "super_admin") {
    const user = await AdminUserModel.create({ name: `User ${role}`, email: `${role}@veena.test`, password: "ChangeThisPassword123!", role, isActive: true });
    return createAccessToken(user.id, user.role);
}
function coursePayload(overrides = {}) {
    return { title: "JEE Advanced", slug: "jee-advanced", category: "Competitive Exam", shortDescription: "Focused JEE Advanced preparation", duration: "1 year", eligibility: "Class 12", outcomes: ["Rank focus"], subjects: [], features: [], batchTimings: [], ...overrides };
}
describe("cms courses", () => {
    it("public list excludes draft and deleted courses", async () => {
        await CourseModel.create(coursePayload({ isPublished: true, publishedAt: new Date() }));
        await CourseModel.create(coursePayload({ title: "Draft", slug: "draft", isPublished: false }));
        await CourseModel.create(coursePayload({ title: "Deleted", slug: "deleted", isPublished: true, isDeleted: true }));
        const res = await request(app).get("/api/v1/courses/public");
        expect(res.status).toBe(200);
        expect(res.body.data).toHaveLength(1);
    });
    it("public detail rejects draft course", async () => {
        await CourseModel.create(coursePayload({ isPublished: false }));
        const res = await request(app).get("/api/v1/courses/public/jee-advanced");
        expect(res.status).toBe(404);
    });
    it("admin list requires auth and content manager can create", async () => {
        const unauth = await request(app).get("/api/v1/courses");
        const auth = await token("content_manager");
        const created = await request(app).post("/api/v1/courses").set("Authorization", `Bearer ${auth}`).send(coursePayload());
        expect(unauth.status).toBe(401);
        expect(created.status).toBe(201);
    });
    it("counsellor cannot create", async () => {
        const auth = await token("counsellor");
        const res = await request(app).post("/api/v1/courses").set("Authorization", `Bearer ${auth}`).send(coursePayload());
        expect(res.status).toBe(403);
    });
    it("rejects duplicate slug and supports update/publish/feature/delete/reorder/search", async () => {
        const auth = await token("admin");
        const first = await request(app).post("/api/v1/courses").set("Authorization", `Bearer ${auth}`).send(coursePayload());
        const duplicate = await request(app).post("/api/v1/courses").set("Authorization", `Bearer ${auth}`).send(coursePayload({ title: "Duplicate" }));
        const id = first.body.data._id;
        const update = await request(app).patch(`/api/v1/courses/${id}`).set("Authorization", `Bearer ${auth}`).send({ title: "JEE Advanced Updated" });
        const publish = await request(app).patch(`/api/v1/courses/${id}/publish`).set("Authorization", `Bearer ${auth}`).send({ value: true });
        const feature = await request(app).patch(`/api/v1/courses/${id}/feature`).set("Authorization", `Bearer ${auth}`).send({ value: true });
        const list = await request(app).get("/api/v1/courses?search=updated&page=1&limit=5").set("Authorization", `Bearer ${auth}`);
        const reorder = await request(app).patch("/api/v1/courses/reorder").set("Authorization", `Bearer ${auth}`).send({ items: [{ id, sortOrder: 2 }] });
        const remove = await request(app).delete(`/api/v1/courses/${id}`).set("Authorization", `Bearer ${auth}`);
        expect(duplicate.status).toBe(409);
        expect(update.status).toBe(200);
        expect(publish.body.data.isPublished).toBe(true);
        expect(feature.body.data.isFeatured).toBe(true);
        expect(list.body.pagination.total).toBe(1);
        expect(reorder.status).toBe(200);
        expect(remove.status).toBe(200);
    });
});
describe("cms faculty results gallery and uploads", () => {
    it("faculty public data hides private contact fields", async () => {
        await FacultyModel.create({ name: "Teacher", slug: "teacher", subject: "Math", qualification: "MSc", experience: "10 years", email: "private@test.com", phone: "999", isPublished: true, publishedAt: new Date() });
        const res = await request(app).get("/api/v1/faculty/public");
        expect(res.status).toBe(200);
        expect(res.body.data[0].email).toBeUndefined();
        expect(res.body.data[0].phone).toBeUndefined();
    });
    it("validates result percentage and filters published results", async () => {
        const auth = await token("admin");
        const bad = await request(app).post("/api/v1/results").set("Authorization", `Bearer ${auth}`).send({ studentName: "A", examName: "JEE", year: 2026, achievement: "Top", percentage: 150 });
        await ResultModel.create({ studentName: "Topper", examName: "JEE", year: 2026, achievement: "Rank", isPublished: true, publishedAt: new Date() });
        const list = await request(app).get("/api/v1/results/public?examName=JEE");
        expect(bad.status).toBe(422);
        expect(list.body.data).toHaveLength(1);
    });
    it("validates gallery image and alt text", async () => {
        const auth = await token("admin");
        const missing = await request(app).post("/api/v1/gallery").set("Authorization", `Bearer ${auth}`).send({ title: "Event", category: "events", altText: "Event" });
        const created = await request(app).post("/api/v1/gallery").set("Authorization", `Bearer ${auth}`).send({ title: "Event", category: "events", altText: "Event image", image: { publicId: "p", secureUrl: "https://placehold.co/100x100" } });
        expect(missing.status).toBe(422);
        expect(created.status).toBe(201);
    });
    it("uploads allowed images, rejects invalid mime, and rejects linked deletion", async () => {
        const auth = await token("admin");
        const uploaded = await request(app).post("/api/v1/uploads/image").set("Authorization", `Bearer ${auth}`).field("module", "course").field("altText", "Course image").attach("file", Buffer.from("fake"), { filename: "course.webp", contentType: "image/webp" });
        const invalid = await request(app).post("/api/v1/uploads/image").set("Authorization", `Bearer ${auth}`).attach("file", Buffer.from("fake"), { filename: "bad.svg", contentType: "image/svg+xml" });
        await CourseModel.create(coursePayload({ image: { publicId: uploaded.body.data.publicId, secureUrl: uploaded.body.data.secureUrl } }));
        const del = await request(app).delete(`/api/v1/uploads/${uploaded.body.data.id}`).set("Authorization", `Bearer ${auth}`);
        expect(uploaded.status).toBe(201);
        expect(await UploadModel.countDocuments()).toBe(1);
        expect(invalid.status).toBe(422);
        expect(del.status).toBe(409);
    });
});
//# sourceMappingURL=cms.test.js.map