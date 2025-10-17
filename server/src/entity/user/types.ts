export interface UserProps {
  id: number;
  fio: string;
  date: string;
  status: string;
}

export type CreateUserProps = Pick<UserProps, "fio">;

export type UpdateStatusProps = Pick<UserProps, "status"> & { id: number };
