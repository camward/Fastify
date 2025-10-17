import { User, CreateUser, UpdateStatus } from "./types";

class UsersService {
  private users: User[] = [
    {
      id: 1,
      fio: "Иванов Иван Иванович",
      date: "2023-01-01",
      status: "active",
    },
    {
      id: 2,
      fio: "Петрова Анна Сергеевна",
      date: "2023-02-01",
      status: "inactive",
    },
    {
      id: 3,
      fio: "Васильев Алексей Петрович",
      date: "2023-03-01",
      status: "active",
    },
  ];

  private nextId = 3;

  /**
   * Возвращает список всех пользователей
   */
  public getUsers(): User[] {
    return this.users;
  }

  /**
   * Добавляет нового пользователя
   *
   * @param input Данные нового пользователя
   */
  public addUser(input: CreateUser): User {
    const newUser: User = {
      id: this.nextId++,
      fio: input.fio,
      date: new Date().toISOString(),
      status: "active",
    };

    this.users.push(newUser);
    return newUser;
  }

  /**
   * Обновляет статус пользователя по ID
   *
   * @param data Входные данные для обновления статуса
   */
  public updateUserStatus(data: UpdateStatus): User | null {
    const { id, status } = data;
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex !== -1) {
      this.users[userIndex].status = status;
      return this.users[userIndex];
    }

    return null;
  }
}

export default UsersService;
