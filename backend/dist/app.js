import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env, isTest } from "./config/env.js";
import { configureCloudinary } from "./config/cloudinary.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { notFoundMiddleware } from "./middlewares/notFound.middleware.js";
import { globalApiLimiter } from "./middlewares/rateLimit.middleware.js";
import { authRouter } from "./routes/auth.routes.js";
import { courseRouter } from "./routes/course.routes.js";
import { facultyRouter } from "./routes/faculty.routes.js";
import { resultRouter } from "./routes/result.routes.js";
import { galleryRouter } from "./routes/gallery.routes.js";
import { uploadRouter } from "./routes/upload.routes.js";
import { healthRouter } from "./routes/health.routes.js";
export function createApp() {
    configureCloudinary();
    const app = express();
    app.disable("x-powered-by");
    app.use(helmet());
    app.use(cors({
        origin(origin, callback) {
            if (!origin || env.CORS_ORIGINS.includes(origin))
                return callback(null, true);
            return callback(new Error("CORS origin not allowed"));
        },
        credentials: true,
    }));
    app.use(express.json({ limit: "1mb" }));
    app.use(cookieParser());
    if (!isTest)
        app.use(morgan("dev"));
    app.use("/api/v1", globalApiLimiter);
    app.use("/api/v1/health", healthRouter);
    app.use("/api/v1/auth", authRouter);
    app.use("/api/v1/courses", courseRouter);
    app.use("/api/v1/faculty", facultyRouter);
    app.use("/api/v1/results", resultRouter);
    app.use("/api/v1/gallery", galleryRouter);
    app.use("/api/v1/uploads", uploadRouter);
    app.use(notFoundMiddleware);
    app.use(errorMiddleware);
    return app;
}
export const app = createApp();
//# sourceMappingURL=app.js.map