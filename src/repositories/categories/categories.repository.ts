import type {
  CategoriesInterface,
  CategoryType,
} from "@/models/categories/categories.models";

export class CategoriesRepository implements CategoriesInterface {
  async getCategories(limit: number, page: number): Promise<CategoryType[]> {
    const category: CategoryType = {
      id: 1,
      name: "Terror",
    };
    return [category];
  }
  async getCategoryById(id: CategoryType["id"]): Promise<CategoryType> {
    const category: CategoryType = {
      id: 1,
      name: "Terror",
    };
    return category;
  }

  /**
   *
   * @param name asd
   * @returns
   */
  async createCategory({
    name,
  }: Omit<CategoryType, "id">): Promise<CategoryType> {
    const category: CategoryType = {
      id: 1,
      name,
    };
    return category;
  }
}
