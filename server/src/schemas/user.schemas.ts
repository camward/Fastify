import Ajv from "ajv";
import ajvKeywords from "ajv-keywords";

const ajv = new Ajv({ allErrors: true });
ajvKeywords(ajv, ["typeof"]);

// Схема для POST /users
export const createUserSchema = {
  $id: "/schemas/create-user",
  type: "object",
  properties: {
    fio: { type: "string", minLength: 1 },
  },
  required: ["fio"],
};

// Схема для PATCH /users/:id/status
export const updateUserStatusSchema = {
  $id: "/schemas/update-status",
  type: "object",
  properties: {
    status: { type: "string", enum: ["active", "inactive"] },
  },
  required: ["status"],
};

// Регистрируем схемы в Fastify
export function registerSchemas(app: any) {
  app.addSchema(createUserSchema);
  app.addSchema(updateUserStatusSchema);
}
