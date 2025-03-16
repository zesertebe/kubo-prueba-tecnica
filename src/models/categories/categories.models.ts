import type { QueryType } from "@/core/types/types";

export type CategoryType = {
  id: number;
  name: string;
};

export interface CategoriesInterface {
  createCategory({ name }: Omit<CategoryType, "id">): Promise<CategoryType>;
  getCategoryById(id: CategoryType["id"]): Promise<CategoryType>;
  getCategories(limit: number, page: number): Promise<CategoryType[]>;
}

export interface CategoriesInterfaceDB {
  createCategory({ name }: Omit<CategoryType, "id">): QueryType;
  getCategoryById(id: CategoryType["id"]): QueryType;
  getCategories(limit: number, page: number): QueryType;
}
