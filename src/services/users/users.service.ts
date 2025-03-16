import type { UsersInterface, UserType } from "@/models/users/users.models";
import type { UsersRepository } from "@/repositories/users/users.repository";

export class UsersService implements UsersInterface {
  constructor(private usersRepository: UsersRepository) {}

  async createUser({
    email,
    name,
    isVerified,
  }: Omit<UserType, "id">): Promise<UserType> {
    return await this.usersRepository.createUser({ email, name, isVerified });
  }
  async getUserById(id: UserType["id"]): Promise<UserType> {
    const user = await this.usersRepository.getUserById(id);
    return user;
  }
  async getUsers(limit: number, page: number): Promise<UserType[]> {
    return await this.usersRepository.getUsers(limit, page);
  }
}
