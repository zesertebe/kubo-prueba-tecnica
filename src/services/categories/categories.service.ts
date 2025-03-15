import type {
  CategoriesInterface,
  CategoryType,
} from "@/models/categories/categories.models";
import type { CategoriesRepository } from "@/repositories/categories/categories.repository";

export class CategoriesService implements CategoriesInterface {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async getCategories(limit: number, page: number): Promise<CategoryType[]> {
    return await this.categoriesRepository.getCategories(limit, page);
  }

  async getCategoryById(id: CategoryType["id"]): Promise<CategoryType> {
    return await this.categoriesRepository.getCategoryById(id);
  }

  async createCategory({
    name,
  }: Omit<CategoryType, "id">): Promise<CategoryType> {
    return await this.categoriesRepository.createCategory({ name });
  }
}
