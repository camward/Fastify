export interface User {
  id: number;
  fio: string;
  date: string;
  status: string;
}

export type CreateUser = Pick<User, "fio">;

export type UpdateStatus = Pick<User, "status"> & { id: number };
