export type CategoryType = {
  id: number;
  name: string;
};

export interface CategoriesInterface {
  createCategory({ name }: Omit<CategoryType, "id">): Promise<CategoryType>;

  getCategoryById(id: CategoryType["id"]): Promise<CategoryType>;
  getCategories(limit: number, page: number): Promise<CategoryType[]>;
}
