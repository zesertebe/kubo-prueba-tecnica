import { ApiError } from "@/core/errors/api.error";
import { Utils } from "@/core/utils/utils";
import type { UserType } from "@/models/users/users.models";
import type { UsersService } from "@/services/users/users.service";
import type { Context } from "hono";

export class UsersController {
  constructor(private usersService: UsersService) {
    this.getUsers = this.getUsers.bind(this);
    this.getUsersById = this.getUsersById.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  async createUser(context: Context) {
    try {
      const body = await context.req.json();
      if (!body) {
        throw ApiError.errorList.INVALID_REQUEST;
      }
      let user: Omit<UserType, "id">;
      const isValidRequest = Utils.hasProperties(["name", "email"], body);
      if (!isValidRequest.verify) {
        const e = ApiError.errorList.INVALID_REQUEST;
        e.message = `Hacen falta las siguientes propiedades de 'user': [${isValidRequest.properties}]`;
        throw e;
      }
      user = {
        name: body.name,
        email: body.email,
      };

      const response = await this.usersService.createUser(user);
      return context.json({
        status: true,
        content: response,
      });
    } catch (e) {
      console.log("e: ", e);
      return ApiError.handle(context, e);
    }
  }

  async getUsersById(context: Context) {
    try {
      const id = context.req.param("id");
      if (!id) {
        throw ApiError.errorList.INVALID_REQUEST;
      }
      const response = this.usersService.getUserByiId(parseInt(id));
      return context.json({
        status: true,
        content: response,
      });
    } catch (error) {
      return ApiError.handle(context, error);
    }
  }

  async getUsers(context: Context) {
    try {
      const limit_ = context.req.query("limit");
      const page_ = context.req.query("page");
      const limit: number = limit_ ? parseInt(limit_) : 10;
      const page: number = page_ ? parseInt(page_) : 1;
      const result = await this.usersService.getUsers(limit, page);
      return context.json({
        status: true,
        content: result,
      });
    } catch (error) {
      return ApiError.handle(context, error);
    }
  }
}
