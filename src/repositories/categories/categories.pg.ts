import { DBFactory } from "@/core/db/factory";
import type { QueryType } from "@/core/types/types";
import type {
  CategoriesInterfaceDB,
  CategoryType,
} from "@/models/categories/categories.models";

export class CategoriesPGRepository implements CategoriesInterfaceDB {
  createCategory({ name }: Omit<CategoryType, "id">): QueryType {
    const result: QueryType = {
      query:
        "INSERT into core.categories(category_name) VALUES ($1) RETURNING *",
      params: [name],
    };
    return result;
  }

  getCategories(limit: number, page: number): QueryType {
    const offset = (page - 1) * limit;
    const result: QueryType = {
      query: "SELECT * FROM core.categories LIMIT $1 OFFSET $2",
      params: [limit, offset],
    };
    return result;
  }

  getCategoryById(id: CategoryType["id"]): QueryType {
    const result = {
      query: "SELECT * FROM core.categories WHERE category_id = $1",
      params: [id],
    };
    return result;
  }
}
