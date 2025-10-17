import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import usersRoutes from "./routes/users.routes";

const app: FastifyInstance = fastify({
  logger: true,
});

// Регистрация CORS
app.register(fastifyCors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
});

// Регистрируем маршруты
app.register(usersRoutes);

// Старт сервера
async function startServer() {
  try {
    const address = await app.server.address();
    if (address) {
      app.log.info(`Server started at ${app.server.address()}`);
    }
    await app.listen({ port: 3000 });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

startServer();
