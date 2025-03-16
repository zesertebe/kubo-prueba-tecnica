import type { QueryType } from "@/core/types/types";

export type UsersMoviesType = {
  userId: number;
  movieId: number;
  viewedAt: string;
};

export interface UsersMoviesInterface {
  getMoviesByUser(id: number): Promise<UsersMoviesType[]>;
  getUsersByMovie(id: number): Promise<UsersMoviesType[]>;
  createUserMovie(
    userId: number,
    movieId: number,
    viewedAt?: string,
  ): Promise<UsersMoviesType>;
}

export interface UsersMoviesInterfaceDB {
  getMoviesByUser(userId: UsersMoviesType["userId"]): QueryType;
  getUsersByMovie(movieId: UsersMoviesType["movieId"]): QueryType;
  createUserMovie(
    userId: UsersMoviesType["userId"],
    movieId: UsersMoviesType["movieId"],
    viewedAt?: UsersMoviesType["viewedAt"],
  ): QueryType;
}
