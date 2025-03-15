import type { UsersInterface, UserType } from "@/models/users/users.models";

export class UsersRepository implements UsersInterface {
  async createUser({ email, name }: Omit<UserType, "id">): Promise<UserType> {
    const user: UserType = {
      email,
      name,
      id: 1,
    };
    return user;
  }

  async getUserByiId(id: UserType["id"]): Promise<UserType> {
    const user: UserType = {
      email: "pepito@gmail.com",
      name: "pepito perez",
      id,
    };
    return user;
  }
  async getUsers(limit: number, page: number): Promise<UserType[]> {
    const user: UserType = {
      email: "pepito@gmail.com",
      name: "pepito perez",
      id: 1,
    };
    return [user];
  }
}
