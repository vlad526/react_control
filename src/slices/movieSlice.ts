import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {getMovies, getMoviesByGenre, searchMovies} from "../services/api.service.ts";
import type {IMovie} from "../models/IMovies/IMovie.ts";
import type {IMoviesResponseModel} from "../models/IMovies/IMoviesResponseModel.ts";


type movieSliceType = {
    moviesPage: IMoviesResponseModel | null,
    movies: IMovie[],
    moviesByGenre: IMovie[],
    searchResults: IMovie[];
    searchPage: number;
    totalSearchPages: number;
    searchQuery: string;
    totalGenrePages: number;

};


const initMovieSliceState: movieSliceType = {
    moviesPage: null,
    movies: [],
    moviesByGenre: [],
    searchResults: [],
    searchPage: 1,
    searchQuery: '',
    totalSearchPages: 0,
    totalGenrePages: 0
};


const loadMovies = createAsyncThunk(
    "loadMovies",
    async (page: string, thunkApi) => {
        const movies = await getMovies(page);
        return thunkApi.fulfillWithValue(movies);

    }
);


const loadMoviesByGenre = createAsyncThunk(
    "loadMoviesByGenre",
    async ({genreId, page, sort}: { genreId: number, page: number, sort: string }, thunkAPI) => {
        const moviesByGenre = await getMoviesByGenre(genreId, page, sort);
        return thunkAPI.fulfillWithValue(moviesByGenre);
    }
);
const loadMoviesBySearch = createAsyncThunk(
    "loadMoviesBySearch",
    async ({query, page}: { query: string; page: number }, thunkAPI) => {
        const results = await searchMovies(query, page);
        return thunkAPI.fulfillWithValue(results);
    }
);


const movieSlice = createSlice({
    name: 'movieSlice',
    initialState: initMovieSliceState,
    reducers: {
        setQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        }
    },
    extraReducers: builder => builder
        .addCase(loadMovies.fulfilled, (state, action: PayloadAction<IMoviesResponseModel>) => {
            state.movies = action.payload?.results ?? [];
            state.moviesPage = action.payload ?? null;
        })

        .addCase(loadMoviesByGenre.fulfilled, (state, action: PayloadAction<IMoviesResponseModel>) => {
            state.moviesByGenre = action.payload.results;
            state.totalGenrePages = action.payload.total_pages;
        })
        .addCase(loadMoviesBySearch.fulfilled, (state, action: PayloadAction<IMoviesResponseModel>) => {
            state.searchResults = action.payload.results;
            state.searchPage = action.payload.page;
            state.totalSearchPages = action.payload.total_pages;

        })


})

export const movieActions = {...movieSlice.actions, loadMovies, loadMoviesByGenre, loadMoviesBySearch,};

export default movieSlice;