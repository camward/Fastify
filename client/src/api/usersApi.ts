import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "../types/user";

const baseUrl = "/api/";

export const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    // Получение списка пользователей
    getUsers: builder.query<User[], void>({
      query: () => ({ url: "users", method: "GET" }),
    }),
    // Добавление нового пользователя
    addUser: builder.mutation<void, Pick<User, "fio">>({
      query(userData) {
        return {
          url: "users",
          method: "POST",
          body: userData,
        };
      },
    }),
  }),
});

export const { useGetUsersQuery, useAddUserMutation } = usersApi;
