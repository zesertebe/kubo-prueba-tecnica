import type { QueryType } from "@/core/types/types";
import type {
  UsersMoviesInterfaceDB,
  UsersMoviesType,
} from "@/models/usersMovies/userMovies.models";

export class UsersMoviesPGRepository implements UsersMoviesInterfaceDB {
  createUserMovie(
    userId: UsersMoviesType["userId"],
    movieId: UsersMoviesType["movieId"],
    viewedAt?: UsersMoviesType["viewedAt"],
  ): QueryType {
    const result: QueryType = {
      query:
        "INSERT into core.users_movies(user_id, movie_id, viewd_at) VALUES ($1, $2, $3 ) RETURNING *",
      params: [userId, movieId, viewedAt],
    };
    return result;
  }

  getUsersByMovie(movieId: UsersMoviesType["movieId"]): QueryType {
    const result: QueryType = {
      query: "SELECT * FROM core.users_movies WHERE movie_id = $1",
      params: [movieId],
    };
    return result;
  }

  getMoviesByUser(userId: UsersMoviesType["userId"]): QueryType {
    const result: QueryType = {
      query: "SELECT * FROM core.users_movies WHERE user_id = $1",
      params: [userId],
    };
    return result;
  }
}
