import { createServer } from "http";
import { connectDatabase, disconnectDatabase } from "./config/database.js";
import { env } from "./config/env.js";
import { app } from "./app.js";

async function bootstrap() {
  await connectDatabase();
  const server = createServer(app);

  server.listen(env.PORT, () => {
    console.log(`Veena Academy API listening on port ${env.PORT}`);
  });

  async function shutdown(signal: string) {
    console.log(`${signal} received. Shutting down API.`);
    server.close(async () => {
      await disconnectDatabase();
      process.exit(0);
    });
  }

  process.on("SIGINT", () => void shutdown("SIGINT"));
  process.on("SIGTERM", () => void shutdown("SIGTERM"));
}

bootstrap().catch((error) => {
  console.error(error instanceof Error ? error.message : "Backend startup failed");
  process.exit(1);
});
