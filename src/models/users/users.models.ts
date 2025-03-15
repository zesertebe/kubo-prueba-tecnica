export type UserType = {
  id: number;
  name: string;
  email: string;
};

export interface UsersInterface {
  getUserByiId(id: UserType["id"]): Promise<UserType>;
  getUsers(limit: number, page: number): Promise<UserType[]>;
  createUser({ email, name }: Omit<UserType, "id">): Promise<UserType>;
}
