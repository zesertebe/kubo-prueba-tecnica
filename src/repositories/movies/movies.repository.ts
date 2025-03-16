import { DBFactory } from "@/core/db/factory";
import { STORE } from "@/core/store/store";
import type {
  MoviesInterface,
  MoviesInterfaceDB,
  MoviesType,
  OrderRelease,
} from "@/models/movies/movies.models";
import { MoviesPGRepository } from "./movies.pg";

export class MoviesRepository implements MoviesInterface {
  private db: MoviesInterfaceDB;
  private factoryDB;
  constructor() {
    this.factoryDB = DBFactory.createRepository();
    this.db =
      STORE.DB == 0 ? new MoviesPGRepository() : new MoviesPGRepository();
  }
  async createMovie({
    title,
    category,
    releaseDate,
    length,
  }: Omit<MoviesType, "id">): Promise<MoviesType> {
    const result = this.db.createMovie({
      title,
      category,
      length,
      releaseDate,
    });
    const movie: MoviesType = (
      await this.factoryDB.query(result.query, result.params)
    )[0];
    return movie;
  }

  async getMovieById(id: MoviesType["id"]): Promise<MoviesType> {
    const result = this.db.getMovieById(id);
    const movie = (await this.factoryDB.query(result.query, result.params))[0];
    return movie;
  }

  async getMovies(
    limit: number,
    page: number,
    order: OrderRelease,
  ): Promise<MoviesType[]> {
    const result = this.db.getMovies(limit, page, order);
    const movies: MoviesType[] = await this.factoryDB.query(
      result.query,
      result.params,
    );
    return movies;
  }
}
