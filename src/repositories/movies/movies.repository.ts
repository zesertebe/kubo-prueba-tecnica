import type {
  MoviesInterface,
  MoviesType,
  OrderRelease,
} from "@/models/movies/movies.models";

export class MoviesRepository implements MoviesInterface {
  async createMovie({
    title,
    category,
    releaseDate,
    length,
  }: Omit<MoviesType, "id">): Promise<MoviesType> {
    const movie: MoviesType = {
      id: 1,
      category,
      length,
      releaseDate,
      title,
    };
    console.log("service movie: ", movie);
    return movie;
  }

  async getMovieById(id: MoviesType["id"]): Promise<MoviesType> {
    const movie: MoviesType = {
      id,
      category: 1,
      length: "27:30",
      releaseDate: "",
      title: "movie",
    };
    return movie;
  }

  async getMovies(
    limit: number,
    page: number,
    order: OrderRelease,
  ): Promise<MoviesType[]> {
    return [
      {
        category: 1,
        id: 1,
        length: "27:30",
        releaseDate: "",
        title: "",
      },
    ];
  }
}
