import { ApiError } from "@/core/errors/api.error";
import type { UsersMoviesService } from "@/services/usersMovies/usersMovies.service";
import type { Context } from "hono";

export class UserMoviesController {
  constructor(private usersMoviesService: UsersMoviesService) {
    this.createUserMovie = this.createUserMovie.bind(this);
    this.getUsersByMovie = this.getUsersByMovie.bind(this);
    this.getMoviesByUser = this.getMoviesByUser.bind(this);
  }

  async getUsersByMovie(context: Context) {
    try {
      const movieId = context.req.param("id");
      if (!movieId) {
        throw ApiError.errorList.INVALID_REQUEST;
      }
      const response = await this.usersMoviesService.getUsersByMovie(
        parseInt(movieId),
      );
      return context.json({
        status: true,
        content: response,
      });
    } catch (error) {
      return ApiError.handle(context, error);
    }
  }

  async getMoviesByUser(context: Context) {
    try {
      const userId = context.req.param("id");
      console.log("userId: ", userId);
      if (!userId) {
        throw ApiError.errorList.INVALID_REQUEST;
      }
      const response = this.usersMoviesService.getMoviesByUser(
        parseInt(userId),
      );
      console.log("controller response : ", response);
      return context.json({
        status: true,
        content: response,
      });
    } catch (error) {
      console.log("error: ", error);
      return ApiError.handle(context, error);
    }
  }

  async createUserMovie(context: Context) {
    try {
      const body = await context.req.json();
      if (!body) {
        throw ApiError.errorList.INVALID_REQUEST;
      }
      const userMovie = {
        userId: body.userId,
        movieId: body.movieId,
      };
      const response = await this.usersMoviesService.createUserMovie(
        userMovie.userId,
        userMovie.movieId,
      );
      return context.json({
        status: true,
        content: response,
      });
    } catch (error) {
      return ApiError.handle(context, error);
    }
  }
}
