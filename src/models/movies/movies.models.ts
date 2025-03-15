export type MoviesType = {
  id: number;
  title: string;
  length: string;
  category: number;
  releaseDate: string;
};

export type OrderRelease = "ASC" | "DESC";

export interface MoviesInterface {
  createMovie({
    title,
    category,
    releaseDate,
    length,
  }: Omit<MoviesType, "id">): Promise<MoviesType>;

  getMovieById(id: MoviesType["id"]): Promise<MoviesType>;
  getMovies(
    limit: number,
    page: number,
    order: OrderRelease,
  ): Promise<MoviesType[]>;
}
