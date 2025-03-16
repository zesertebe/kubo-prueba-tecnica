import { DBFactory } from "@/core/db/factory";
import { STORE } from "@/core/store/store";
import type {
  CategoriesInterface,
  CategoriesInterfaceDB,
  CategoryType,
} from "@/models/categories/categories.models";
import { CategoriesPGRepository } from "./categories.pg";

export class CategoriesRepository implements CategoriesInterface {
  private db: CategoriesInterfaceDB;
  private factoryDB;
  constructor() {
    this.factoryDB = DBFactory.createRepository();
    this.db =
      STORE.DB == 0
        ? new CategoriesPGRepository()
        : new CategoriesPGRepository();
  }
  async getCategories(limit: number, page: number): Promise<CategoryType[]> {
    const result = this.db.getCategories(limit, page);
    const category: CategoryType[] = await this.factoryDB.query(
      result.query,
      result.params,
    );
    console.log("CategoriesRepository > get categories category: ", category);
    return category;
  }

  async getCategoryById(id: CategoryType["id"]): Promise<CategoryType> {
    const result = this.db.getCategoryById(id);
    const category: CategoryType = (
      await this.factoryDB.query(result.query, result.params)
    )[0];
    console.log("CategoriesRepository > get category id category: ", category);
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
    const result = this.db.createCategory({ name });
    const category: CategoryType = (
      await this.factoryDB.query(result.query, result.params)
    )[0];
    console.log("CategoriesRepository > create category: ", category);
    return category;
  }
}
