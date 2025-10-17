import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import routes from "./routes";

const app: FastifyInstance = fastify({
  logger: true,
});

// Регистрация CORS
app.register(fastifyCors);

// Регистрируем маршруты
routes(app);

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
