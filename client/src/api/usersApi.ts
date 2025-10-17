import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "../types/user";

const baseUrl = "http://localhost:3000/";

export const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    // Получение списка пользователей
    getUsers: builder.query<User[], void>({
      query: () => ({ url: "users", method: "GET" }),
      keepUnusedDataFor: 60, // Сколько секунд хранить данные в кеше, если запрос не используется
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
    // Добавление нового пользователя
    updateUserStatus: builder.mutation<User, Partial<User>>({
      query: ({ id, status }) => ({
        url: `/users/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useUpdateUserStatusMutation,
} = usersApi;
