import { ApiError } from "@/core/errors/api.error";
import type { Context } from "hono";

export class MoviesController {
  static getMovieById(context: Context) {
    try {
      return {
        status: true,
        content: "",
      };
    } catch (e) {
      return ApiError.handle(context, e);
    }
  }
}
