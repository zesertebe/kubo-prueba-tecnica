import { DBFactory } from "@/core/db/factory";
import { STORE } from "@/core/store/store";
import type {
  UsersMoviesInterface,
  UsersMoviesInterfaceDB,
  UsersMoviesType,
} from "@/models/usersMovies/userMovies.models";
import { UsersMoviesPGRepository } from "./usersMovies.pg";
import type { QueryType } from "@/core/types/types";

export class UsersMoviesRepository implements UsersMoviesInterface {
  private db: UsersMoviesInterfaceDB;
  private factoryDB;
  constructor() {
    this.factoryDB = DBFactory.createRepository();
    this.db =
      STORE.DB == 0
        ? new UsersMoviesPGRepository()
        : new UsersMoviesPGRepository();
  }

  async getMoviesByUser(id: number): Promise<UsersMoviesType[]> {
    const query = this.db.getMoviesByUser(id);
    const results: UsersMoviesType[] = await this.factoryDB.query(
      query.query,
      query.params,
    );
    return results;
  }

  async getUsersByMovie(id: number): Promise<UsersMoviesType[]> {
    const query: QueryType = this.db.getUsersByMovie(id);
    const results: UsersMoviesType[] = await this.factoryDB.query(
      query.query,
      query.params,
    );
    return results;
  }

  async createUserMovie(
    userId: number,
    movieId: number,
    viewedAt: string,
  ): Promise<UsersMoviesType> {
    const query = this.db.createUserMovie(userId, movieId, viewedAt);
    const result: UsersMoviesType = await this.factoryDB.query(
      query.query,
      query.params,
    );
    return result;
  }
}
