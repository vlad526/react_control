import axios from 'axios';
import {API_KEY, BASE_URL} from "../components/user-info/UserInfo.ts";
import type {IMoviesResponseModel} from "../models/IMovies/IMoviesResponseModel.ts";
import type {IMovie} from "../models/IMovies/IMovie.ts";
import type {IGenresResponseModel} from "../models/IGenres/IGenresResponseModel.ts";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    params: {api_key: API_KEY},
    headers: {'Content-Type': 'application/json'},
})

axiosInstance.interceptors.request.use((request) => {

        return request;
    });

export const getMovies = async (page: string):Promise<IMoviesResponseModel> => {


    const {data}= await axiosInstance.get<IMoviesResponseModel>(`/discover/movie`,{
        params: {
            page: +page,
        },
    });
    return data;
}

export const getMovie = async (id:number):Promise<IMovie> => {
    const {data} = await axiosInstance.get<IMovie>(`/movie/${id}`);
    return data;
}


export const getGenres = async ():Promise<IGenresResponseModel> => {
    const {data} = await axiosInstance.get<IGenresResponseModel>(`/genre/movie/list?language=en`);
    return data;
}

export const getMoviesByGenre = async (
    genreId: number,
    page: number = 1,
    sort: string = "popularity.desc"
): Promise<IMoviesResponseModel> => {
    const { data } = await axiosInstance.get("/discover/movie", {
        params: {
            with_genres: genreId,
            page,
            sort_by: sort,
        },
    });
    return data;
};

export const searchMovies = async (query: string, page: number = 1): Promise<IMoviesResponseModel> => {
    const { data } = await axiosInstance.get("/search/movie", {
        params: {
            query,
            page
        },
    });
    return data;
};

