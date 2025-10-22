import type {IMovie} from "./IMovie.ts";

export interface IMoviesResponseModel {
    "page": number,
    "results":IMovie[],
    "total_pages": number,
    "total_results": number
}