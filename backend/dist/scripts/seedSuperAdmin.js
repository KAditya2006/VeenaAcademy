import { connectDatabase, disconnectDatabase } from "../config/database.js";
import { env } from "../config/env.js";
import { AdminUserModel } from "../models/AdminUser.model.js";
import { writeAuditLog } from "../services/audit.service.js";
import { seedAdminSchema } from "../validations/auth.validation.js";
export async function seedSuperAdmin() {
    const values = seedAdminSchema.parse({
        name: env.ADMIN_NAME,
        email: env.ADMIN_EMAIL,
        password: env.ADMIN_PASSWORD,
    });
    const existing = await AdminUserModel.findOne({ email: values.email });
    if (existing) {
        console.log("Super admin already exists. No changes made.");
        return existing;
    }
    const admin = await AdminUserModel.create({
        name: values.name,
        email: values.email,
        password: values.password,
        role: "super_admin",
        isActive: true,
    });
    await writeAuditLog({ userId: admin.id, action: "admin.seed.created", module: "admin-users", targetId: admin.id });
    console.log(`Super admin created for ${admin.email}`);
    return admin;
}
async function run() {
    await connectDatabase();
    await seedSuperAdmin();
    await disconnectDatabase();
}
if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, "/")}`) {
    run().catch(async (error) => {
        console.error(error instanceof Error ? error.message : "Seed failed");
        await disconnectDatabase();
        process.exit(1);
    });
}
//# sourceMappingURL=seedSuperAdmin.js.map