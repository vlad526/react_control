import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {getGenres} from "../services/api.service.ts";
import type {IGenre} from "../models/IGenres/IGenre.ts";

type genreSliceType = {
    genres: IGenre[]
}
const initGenreSliceState: genreSliceType = {genres: []}


const loadGenres = createAsyncThunk(
    "loadGenres", async (_, thunkApi) => {
        const genres = await getGenres();
        return thunkApi.fulfillWithValue(genres.genres);

    }
);


export const genreSlice = createSlice({
    name: 'genreSlice',
    initialState: initGenreSliceState,
    reducers: {},
    extraReducers: builder => builder.addCase(loadGenres.fulfilled, (state, action: PayloadAction<IGenre[]>) => {
        state.genres = action.payload;
    }),
})


export const genreActions = {...genreSlice.actions, loadGenres};