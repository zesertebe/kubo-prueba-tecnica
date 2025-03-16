import type { QueryType } from "@/core/types/types";
import type { UsersInterfaceDB, UserType } from "@/models/users/users.models";

export class UsersPGRepository implements UsersInterfaceDB {
  createUser({ name, isVerified, email }: Omit<UserType, "id">): QueryType {
    const result: QueryType = {
      query:
        "INSERT into core.users(user_name, user_email, user_verified) VALUES ($1, $2, $3 ) RETURNING *",
      params: [name, email, isVerified],
    };
    return result;
  }

  getUsers(limit: number, page: number): QueryType {
    const offset = (page - 1) * limit;
    const result: QueryType = {
      query: "SELECT * FROM core.users LIMIT $1 OFFSET $2",
      params: [limit, offset],
    };
    return result;
  }

  getUserById(id: UserType["id"]): QueryType {
    const result = {
      query: "SELECT * FROM core.users WHERE user_id = $1",
      params: [id],
    };
    return result;
  }
}
