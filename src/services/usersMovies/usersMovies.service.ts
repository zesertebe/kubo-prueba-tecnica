import type { UsersMoviesInterface } from "@/models/usersMovies/userMovies.models";
import type { UsersMoviesRepository } from "@/repositories/usersMovies/usersMovies.repository";

export class UsersMoviesService implements UsersMoviesInterface {
  constructor(private userMoviesRepository: UsersMoviesRepository) {}
  async getMoviesByUser(id: number) {
    const response = await this.userMoviesRepository.getMoviesByUser(id);
    return response;
  }

  async getUsersByMovie(id: number) {
    return await this.userMoviesRepository.getUsersByMovie(id);
  }

  async createUserMovie(userId: number, movieId: number): Promise<any> {
    const viewedAt: string = new Date().toDateString();
    return await this.userMoviesRepository.createUserMovie(
      userId,
      movieId,
      viewedAt,
    );
  }
}
