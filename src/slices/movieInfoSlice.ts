import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {getMovie} from "../services/api.service.ts";
import type {IMovie} from "../models/IMovies/IMovie.ts";

type movieSliceType = {
    movie: IMovie | undefined;
};

const initMovieSliceState: movieSliceType = {movie: undefined};

const loadMovie = createAsyncThunk(
    "loadMovies",
    async (id: number, thunkApi) => {
        const movie = await getMovie(id);
        return thunkApi.fulfillWithValue(movie);
    }
);

const movieInfoSlice = createSlice({
    name: "movieSlice",
    initialState: initMovieSliceState,
    reducers: {
        clearMovie: (state) => {
            state.movie = undefined;
        },
    },
    extraReducers: (builder) =>
        builder.addCase(loadMovie.fulfilled, (state, action: PayloadAction<IMovie>) => {
            state.movie = action.payload;
        }),
});

export const movieInfoActions = {
    ...movieInfoSlice.actions,
    loadMovie,
};

export default movieInfoSlice;
