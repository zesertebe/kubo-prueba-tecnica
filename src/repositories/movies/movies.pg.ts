import type { QueryType } from "@/core/types/types";
import type {
  MoviesInterfaceDB,
  MoviesType,
} from "@/models/movies/movies.models";

export class MoviesPGRepository implements MoviesInterfaceDB {
  createMovie({
    title,
    releaseDate,
    length,
    category,
  }: Omit<MoviesType, "id">): QueryType {
    const result: QueryType = {
      query:
        "INSERT into core.movies(movie_title, movie_release_date, movie_length, movie_category) VALUES ($1, $2, $3, $4) RETURNING *",
      params: [title, releaseDate, length, category],
    };
    return result;
  }

  getMovies(limit: number, page: number): QueryType {
    const offset = (page - 1) * limit;
    const result: QueryType = {
      query: "SELECT * FROM core.movies LIMIT $1 OFFSET $2",
      params: [limit, offset],
    };
    return result;
  }

  getMovieById(id: MoviesType["id"]): QueryType {
    const result = {
      query: "SELECT * FROM core.movies WHERE movie_id = $1",
      params: [id],
    };
    return result;
  }
}
