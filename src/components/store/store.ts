import {configureStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import movieSlice from "../../slices/movieSlice.ts";
import {genreSlice} from "../../slices/genreSlice.ts";
import movieInfoSlice from "../../slices/movieInfoSlice.ts";


export const store = configureStore({
    reducer: {
        movieStoreSlice:movieSlice.reducer,
        movieInfoStoreSlice:movieInfoSlice.reducer,
        genreStoreSlice:genreSlice.reducer,
    }
});
export const useAppSelector =useSelector.withTypes<ReturnType<typeof store.getState>>();
export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
