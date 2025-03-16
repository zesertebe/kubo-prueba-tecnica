import { ApiError } from "@/core/errors/api.error";
import { Utils } from "@/core/utils/utils";
import type { CategoryType } from "@/models/categories/categories.models";
import type { CategoriesService } from "@/services/categories/categories.service";
import type { Context } from "hono";

export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {
    this.getCategoryById = this.getCategoryById.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.createCategory = this.createCategory.bind(this);
  }

  async createCategory(context: Context) {
    try {
      const body = await context.req.json();
      if (!body) {
        throw ApiError.errorList.INVALID_REQUEST;
      }
      let category: Omit<CategoryType, "id">;
      const isValidRequest = Utils.hasProperties(["name"], body);
      if (!isValidRequest.verify) {
        const e = ApiError.errorList.INVALID_REQUEST;
        e.message = `Hacen falta las siguientes propiedades de 'category': [${isValidRequest.properties}]`;
        throw e;
      }
      category = {
        name: body.name,
      };

      const response = await this.categoriesService.createCategory(category);
      return context.json({
        status: true,
        content: response,
      });
    } catch (e) {
      console.log("e: ", e);
      return ApiError.handle(context, e);
    }
  }

  async getCategoryById(context: Context) {
    try {
      const id = context.req.param("id");
      if (!id) {
        throw ApiError.errorList.INVALID_REQUEST;
      }
      const response = await this.categoriesService.getCategoryById(
        parseInt(id),
      );
      if (!response) {
        const e = ApiError.errorList.NOT_FOUND;
        e.message =
          "No se ha encontrado ninguna categoría con el id especificado";
        throw e;
      }
      return context.json({
        status: true,
        content: response,
      });
    } catch (e) {
      return ApiError.handle(context, e);
    }
  }

  async getCategories(context: Context) {
    try {
      const limit_ = context.req.query("limit") || "10";
      const page_ = context.req.query("page") || "1";
      const limit = parseInt(limit_);
      const page = parseInt(page_);
      console.log("limit: ", limit);
      console.log("page: ", page);
      const response = await this.categoriesService.getCategories(limit, page);
      return context.json({
        status: true,
        content: response,
      });
    } catch (e) {
      return ApiError.handle(context, e);
    }
  }
}
