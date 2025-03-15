import { Hono } from "hono";
import { ApiError, Errors } from "@/core/errors/api.error";
import type { StatusCode } from "hono/utils/http-status";
import { usersMoviesRoutes } from "./api/usersMovies/routes/usersMovies.routes";

/**
 * Definir rutas para retornar
 */
export const setRoutes = (app: Hono) => {
  app.onError((error, context) => {
    console.log("error_");
    console.log(error);
    if (error instanceof Errors) {
      context.status(error.statusCode as StatusCode);
      return context.json(error.toResponse());
    }
    context.status(500);
    return context.json(ApiError.errorList.INTERNAL_SERVER_ERROR.toResponse());
  });

  app.notFound((c) => {
    const error = ApiError.errorList.NOT_FOUND;
    c.status(error.statusCode);
    return c.json(error.toResponse());
  });

  app.route("/usersmovies", usersMoviesRoutes);
};
