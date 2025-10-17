import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

export default async function registerRoutes(app: FastifyInstance) {
  app.get("/", async (_request: FastifyRequest, reply: FastifyReply) => {
    app.log.info("Handling root request");
    return reply.send({ message: "Hello World!" });
  });
}
