import { ApiError } from "@/core/errors/api.error";
import { Utils } from "@/core/utils/utils";
import type { MoviesType, OrderRelease } from "@/models/movies/movies.models";
import type { MoviesService } from "@/services/movies/movies.service";
import type { Context } from "hono";

export class MoviesController {
  constructor(private moviesService: MoviesService) {
    this.getMovieById = this.getMovieById.bind(this);
    this.getMovies = this.getMovies.bind(this);
    this.createMovie = this.createMovie.bind(this);
  }

  async createMovie(context: Context) {
    try {
      const body = await context.req.json();
      if (!body) {
        throw ApiError.errorList.INVALID_REQUEST;
      }
      console.log("body:", body);
      let movie: Omit<MoviesType, "id">;
      const isValidRequest = Utils.hasProperties(
        ["category", "length", "releaseDate", "title"],
        body,
      );
      console.log("isValidRequest: ", isValidRequest);
      if (!isValidRequest.verify) {
        const e = ApiError.errorList.INVALID_REQUEST;
        e.message = `Hacen falta las siguientes propiedades de 'movie': [${isValidRequest.properties}]`;
        throw e;
      }
      movie = {
        category: body.category,
        length: body.length,
        releaseDate: body.releaseDate,
        title: body.title,
      };

      console.log("movie: ", movie);
      const response = await this.moviesService.createMovie(movie);
      return context.json({
        status: true,
        content: response,
      });
    } catch (e) {
      console.log("e: ", e);
      return ApiError.handle(context, e);
    }
  }

  async getMovieById(context: Context) {
    try {
      const id = context.req.param("id");
      if (!id) {
        throw ApiError.errorList.INVALID_REQUEST;
      }
      const response = await this.moviesService.getMovieById(parseInt(id));
      return context.json({
        status: true,
        content: response,
      });
    } catch (e) {
      return ApiError.handle(context, e);
    }
  }

  async getMovies(context: Context) {
    try {
      const limit_ = context.req.query("limit") || "10";
      const order_ = context.req.query("order") as OrderRelease;
      const orderRelease: OrderRelease[] = ["ASC", "DESC"];
      const page_ = context.req.query("page") || "1";
      const limit = parseInt(limit_);
      const page = parseInt(page_);
      const order: OrderRelease = orderRelease.includes(order_)
        ? order_
        : "DESC";
      console.log("limit: ", limit);
      console.log("order: ", order);
      console.log("page: ", page);
      const response = await this.moviesService.getMovies(limit, page, order);
      return context.json({
        status: true,
        content: response,
      });
    } catch (e) {
      return ApiError.handle(context, e);
    }
  }
}
