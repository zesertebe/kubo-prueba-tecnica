import { UsersMoviesRepository } from "@/repositories/usersMovies/usersMovies.repository";
import { UsersMoviesService } from "@/services/usersMovies/usersMovies.service";
import { Hono } from "hono";
import { UserMoviesController } from "../controller/usersMovies.controller";

export const usersMoviesRoutes = new Hono();

const usersMoviesRepository = new UsersMoviesRepository();
const usersMoviesService = new UsersMoviesService(usersMoviesRepository);
const usersMoviesController = new UserMoviesController(usersMoviesService);

usersMoviesRoutes.get("/user/:id", usersMoviesController.getMoviesByUser);
usersMoviesRoutes.get("/movie/:id", usersMoviesController.getUsersByMovie);
usersMoviesRoutes.post("/", usersMoviesController.createUserMovie);
