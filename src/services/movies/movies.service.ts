import type {
  MoviesInterface,
  MoviesType,
  OrderRelease,
} from "@/models/movies/movies.models";
import type { MoviesRepository } from "@/repositories/movies/movies.repository";

export class MoviesService implements MoviesInterface {
  constructor(private moviesRepository: MoviesRepository) {}
  async createMovie({
    title,
    category,
    releaseDate,
    length,
  }: Omit<MoviesType, "id">): Promise<MoviesType> {
    return this.moviesRepository.createMovie({
      category,
      length,
      releaseDate,
      title,
    });
  }
  async getMovieById(id: MoviesType["id"]): Promise<MoviesType> {
    return this.moviesRepository.getMovieById(id);
  }
  async getMovies(
    limit: number,
    page: number,
    order: OrderRelease,
  ): Promise<MoviesType[]> {
    return this.moviesRepository.getMovies(limit, page, order);
  }
}
