import type {
  UsersMoviesInterface,
  UsersMoviesType,
} from "@/models/usersMovies/userMovies.models";

export class UsersMoviesRepository implements UsersMoviesInterface {
  getMoviesByUser(id: number): Promise<any> {
    return new Promise(() => {
      const results: UsersMoviesType[] = [
        {
          movieId: 1,
          userId: 1,
          viewedAt: "2024-05-25",
        },
      ];
      return results;
    });
  }

  getUsersByMovie(id: number): Promise<any> {
    return new Promise(() => {
      const results: UsersMoviesType[] = [
        {
          movieId: 2,
          userId: 2,
          viewedAt: "2024-05-25",
        },
      ];
      return results;
    });
  }

  createUserMovie(
    userId: number,
    movieId: number,
    viewedAt: string,
  ): Promise<any> {
    return new Promise(() => {
      const result: UsersMoviesType = {
        movieId,
        userId,
        viewedAt,
      };
    });
  }
}
