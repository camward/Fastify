import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import UsersService from "../entity/user/service";
import { CreateUserProps, UserProps } from "../entity/user/types";
import {
  createUserSchema,
  updateUserStatusSchema,
  registerSchemas,
} from "../schemas/user.schemas";
import User from '../entity/user/models'

export default async function registerUsersRoutes(app: FastifyInstance) {
  // Регистрируем схемы валидации
  registerSchemas(app);

  const usersService = new UsersService();

  // Получение списка пользователей
  app.get("/users", async (_request: FastifyRequest, reply: FastifyReply) => {
    // const usersList = usersService.getUsers();
    const usersList = await User.findAll();

    app.log.info("Запрос на получение списка пользователей");
    return reply.send(usersList);
  });

  // Добавление нового пользователя
  app.post("/users", {
    schema: {
      body: createUserSchema,
    },
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      const body = request.body as UserProps;

      if (!body || !body.fio) {
        return reply
          .status(400)
          .send({ error: "Поле ФИО обязательно для заполнения" });
      }

      // const createdUser = usersService.addUser(body);
      const createdUser = await User.create(body);

      app.log.info("Запрос на добавление пользователя");
      return reply.code(201).send(createdUser);
    },
  });

  // Обновление статуса пользователя
  app.patch("/users/:id/status", {
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "number" },
        },
        required: ["id"],
      },
      body: updateUserStatusSchema,
    },
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      const params = request.params as { id: string };
      const body = request.body as { status: string };

      // const updatedUser = usersService.updateUserStatus({
      //   id: parseInt(params.id),
      //   status: body.status,
      // });

      const updatedUser = await User.update(body, {
        where: { id: parseInt(params.id) }
      });

      if (!updatedUser) {
        return reply.status(404).send({ error: "Пользователь не найден" });
      }

      app.log.info("Запрос на обновление статуса");
      return reply.send(updatedUser);
    },
  });
}
