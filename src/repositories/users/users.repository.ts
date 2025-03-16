import { DBFactory } from "@/core/db/factory";
import { STORE } from "@/core/store/store";
import type {
  UsersInterface,
  UsersInterfaceDB,
  UserType,
} from "@/models/users/users.models";
import { UsersPGRepository } from "./users.pg";

export class UsersRepository implements UsersInterface {
  private db: UsersInterfaceDB;
  private factoryDB;
  constructor() {
    this.factoryDB = DBFactory.createRepository();
    this.db = STORE.DB == 0 ? new UsersPGRepository() : new UsersPGRepository();
  }
  async createUser({
    email,
    name,
    isVerified,
  }: Omit<UserType, "id">): Promise<UserType> {
    const result = this.db.createUser({
      email,
      name,
      isVerified,
    });
    const user: UserType = await this.factoryDB.query(
      result.query,
      result.params,
    );

    return user;
  }

  async getUserById(id: UserType["id"]): Promise<UserType> {
    const result = this.db.getUserById(id);
    const user: UserType = (
      await this.factoryDB.query(result.query, result.params)
    )[0];
    return user;
  }

  async getUsers(limit: number, page: number): Promise<UserType[]> {
    const result = this.db.getUsers(limit, page);
    const user: UserType[] = await this.factoryDB.query(
      result.query,
      result.params,
    );
    return user;
  }
}
