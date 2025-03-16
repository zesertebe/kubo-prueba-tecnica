import { Hono } from "hono";
import { MoviesController } from "../controller/movies.controller";
import { MoviesService } from "@/services/movies/movies.service";
import { MoviesRepository } from "@/repositories/movies/movies.repository";

export const moviesRoutes = new Hono();

const moviesRepository = new MoviesRepository();
const moviesService = new MoviesService(moviesRepository);
const moviesController = new MoviesController(moviesService);

moviesRoutes.get("/:id", moviesController.getMovieById);
moviesRoutes.post("/", moviesController.createMovie);
moviesRoutes.get("/", moviesController.getMovies);
moviesRoutes.get("/news/", moviesController.getNewMovies);
