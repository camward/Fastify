import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { FastifyRequest, FastifyReply } from "fastify";

const app = fastify({
  logger: true,
});

// Регистрация CORS
app.register(fastifyCors);

// Обработчики маршрутов
app.get("/", async (_request: FastifyRequest, reply: FastifyReply) => {
  app.log.info("Handling root request");
  return reply.send({ message: "Hello World!" });
});

// Старт сервера
async function startServer() {
  try {
    await app.listen({ port: 3000 });
    app.log.info(`Server started at ${app.server.address()}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

startServer();
