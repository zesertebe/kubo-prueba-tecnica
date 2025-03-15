export type UsersMoviesType = {
  userId: number;
  movieId: number;
  viewedAt: string;
};

export interface UsersMoviesInterface {
  getMoviesByUser(id: number): Promise<any>;
  getUsersByMovie(id: number): Promise<any>;
  createUserMovie(
    userId: number,
    movieId: number,
    viewedAt?: string,
  ): Promise<any>;
}
