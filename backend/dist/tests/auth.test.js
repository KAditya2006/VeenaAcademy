import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { createApp } from "../app.js";
import { AdminUserModel } from "../models/AdminUser.model.js";
import { RefreshTokenModel } from "../models/RefreshToken.model.js";
import { seedSuperAdmin } from "../scripts/seedSuperAdmin.js";
import { createAccessToken } from "../services/token.service.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";
import { errorMiddleware } from "../middlewares/error.middleware.js";
let mongo;
const app = createApp();
const password = "ChangeThisPassword123!";
beforeAll(async () => {
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
describe("health", () => {
    it("returns 200", async () => {
        const res = await request(app).get("/api/v1/health");
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
    });
});
describe("seed", () => {
    it("creates first super admin and does not duplicate", async () => {
        await seedSuperAdmin();
        await seedSuperAdmin();
        const admins = await AdminUserModel.find({ email: "admin@veenaacademy.com" });
        expect(admins).toHaveLength(1);
        expect(admins[0].role).toBe("super_admin");
    });
});
describe("auth", () => {
    async function createAdmin(overrides = {}) {
        return AdminUserModel.create({
            name: "Test Admin",
            email: "admin@veenaacademy.com",
            password,
            role: "super_admin",
            isActive: true,
            ...overrides,
        });
    }
    it("logs in, returns an access token, and sets refresh cookie", async () => {
        await createAdmin();
        const res = await request(app).post("/api/v1/auth/login").send({ email: "admin@veenaacademy.com", password, rememberMe: true });
        expect(res.status).toBe(200);
        expect(res.body.data.accessToken).toBeTruthy();
        expect(String(res.headers["set-cookie"])).toContain("veena_refresh_token");
    });
    it("rejects invalid password and unknown email", async () => {
        await createAdmin();
        const badPassword = await request(app).post("/api/v1/auth/login").send({ email: "admin@veenaacademy.com", password: "wrong" });
        const unknown = await request(app).post("/api/v1/auth/login").send({ email: "none@veenaacademy.com", password });
        expect(badPassword.status).toBe(401);
        expect(unknown.status).toBe(401);
    });
    it("rejects inactive and locked accounts", async () => {
        await createAdmin({ isActive: false });
        const inactive = await request(app).post("/api/v1/auth/login").send({ email: "admin@veenaacademy.com", password });
        expect(inactive.status).toBe(403);
        await AdminUserModel.deleteMany({});
        await createAdmin({ failedLoginAttempts: 5, lockUntil: new Date(Date.now() + 60_000) });
        const locked = await request(app).post("/api/v1/auth/login").send({ email: "admin@veenaacademy.com", password });
        expect(locked.status).toBe(423);
    });
    it("validates login payload", async () => {
        const res = await request(app).post("/api/v1/auth/login").send({ email: "bad", password: "" });
        expect(res.status).toBe(422);
    });
    it("refreshes and rotates token", async () => {
        await createAdmin();
        const login = await request(app).post("/api/v1/auth/login").send({ email: "admin@veenaacademy.com", password });
        const cookie = login.headers["set-cookie"];
        const refresh = await request(app).post("/api/v1/auth/refresh").set("Cookie", cookie);
        expect(refresh.status).toBe(200);
        expect(refresh.body.data.accessToken).toBeTruthy();
        expect(await RefreshTokenModel.countDocuments({ revokedAt: { $ne: null } })).toBe(1);
    });
    it("rejects missing refresh cookie", async () => {
        const res = await request(app).post("/api/v1/auth/refresh");
        expect(res.status).toBe(401);
    });
    it("logs out idempotently and revokes token", async () => {
        await createAdmin();
        const login = await request(app).post("/api/v1/auth/login").send({ email: "admin@veenaacademy.com", password });
        const cookie = login.headers["set-cookie"];
        const logout = await request(app).post("/api/v1/auth/logout").set("Cookie", cookie);
        const second = await request(app).post("/api/v1/auth/logout");
        expect(logout.status).toBe(200);
        expect(second.status).toBe(200);
        expect(await RefreshTokenModel.countDocuments({ revokedAt: { $ne: null } })).toBe(1);
    });
    it("returns current user with access token", async () => {
        const admin = await createAdmin();
        const token = createAccessToken(admin.id, admin.role);
        const res = await request(app).get("/api/v1/auth/me").set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.data.user.email).toBe("admin@veenaacademy.com");
    });
    it("rejects missing token and inactive user on me", async () => {
        const admin = await createAdmin({ isActive: false });
        const token = createAccessToken(admin.id, admin.role);
        const missing = await request(app).get("/api/v1/auth/me");
        const inactive = await request(app).get("/api/v1/auth/me").set("Authorization", `Bearer ${token}`);
        expect(missing.status).toBe(401);
        expect(inactive.status).toBe(403);
    });
    it("changes password and revokes sessions", async () => {
        await createAdmin();
        const login = await request(app).post("/api/v1/auth/login").send({ email: "admin@veenaacademy.com", password });
        const token = login.body.data.accessToken;
        const res = await request(app).post("/api/v1/auth/change-password").set("Authorization", `Bearer ${token}`).send({ currentPassword: password, newPassword: "NewPassword123!", confirmPassword: "NewPassword123!" });
        expect(res.status).toBe(200);
        expect(await RefreshTokenModel.countDocuments({ revokedAt: { $ne: null } })).toBe(1);
    });
    it("rejects wrong, weak, and reused passwords", async () => {
        const admin = await createAdmin();
        const token = createAccessToken(admin.id, admin.role);
        const wrong = await request(app).post("/api/v1/auth/change-password").set("Authorization", `Bearer ${token}`).send({ currentPassword: "WrongPassword123!", newPassword: "NewPassword123!", confirmPassword: "NewPassword123!" });
        const weak = await request(app).post("/api/v1/auth/change-password").set("Authorization", `Bearer ${token}`).send({ currentPassword: password, newPassword: "weak", confirmPassword: "weak" });
        const reused = await request(app).post("/api/v1/auth/change-password").set("Authorization", `Bearer ${token}`).send({ currentPassword: password, newPassword: password, confirmPassword: password });
        expect(wrong.status).toBe(400);
        expect(weak.status).toBe(422);
        expect(reused.status).toBe(400);
    });
    it("enforces RBAC middleware", async () => {
        const rbacApp = express();
        rbacApp.get("/test-rbac", protect, authorize("super_admin"), (_req, res) => res.json({ ok: true }));
        rbacApp.get("/test-rbac-denied", protect, authorize("admin"), (_req, res) => res.json({ ok: true }));
        rbacApp.use(errorMiddleware);
        const admin = await createAdmin();
        const token = createAccessToken(admin.id, admin.role);
        const allowed = await request(rbacApp).get("/test-rbac").set("Authorization", `Bearer ${token}`);
        const denied = await request(rbacApp).get("/test-rbac-denied").set("Authorization", `Bearer ${token}`);
        expect(allowed.status).toBe(200);
        expect(denied.status).toBe(403);
    });
});
//# sourceMappingURL=auth.test.js.map