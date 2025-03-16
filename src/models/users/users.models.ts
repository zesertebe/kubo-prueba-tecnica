export type UserType = {
  id: number;
  name: string;
  email: string;
  isVerified: boolean;
};

export interface UsersInterface {
  getUserByiId(id: UserType["id"]): Promise<UserType>;
  getUsers(limit: number, page: number): Promise<UserType[]>;
  createUser({
    email,
    name,
  }: Omit<UserType, "id" | "isVerified">): Promise<UserType>;
}
