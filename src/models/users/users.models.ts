import type { QueryType } from "@/core/types/types";

export type UserType = {
  id: number;
  name: string;
  email: string;
  isVerified: boolean;
};

export interface UsersInterface {
  getUserById(id: UserType["id"]): Promise<UserType>;
  getUsers(limit: number, page: number): Promise<UserType[]>;
  createUser({
    email,
    name,
    isVerified,
  }: Omit<UserType, "id">): Promise<UserType>;
}

export interface UsersInterfaceDB {
  getUserById(id: UserType["id"]): QueryType;
  getUsers(limit: number, page: number): QueryType;
  createUser({ email, name, isVerified }: Omit<UserType, "id">): QueryType;
}
