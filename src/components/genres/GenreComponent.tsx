import {useEffect, useCallback} from "react";
import {useSearchParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../store/store.ts";
import GenreBadge from "./GenreBadge.tsx";
import {genreActions} from "../../slices/genreSlice.ts";
import {movieActions} from "../../slices/movieSlice.ts";
import {MovieDetailCard} from "../movies-detail-card/MovieDetailCard.tsx";
import * as React from "react";


export const GenreComponent = () => {
    const dispatch = useAppDispatch();


    const availableGenres = useAppSelector((state) => state.genreStoreSlice.genres);
    const filteredMovies = useAppSelector((state) => state.movieStoreSlice.moviesByGenre);

    const [urlParams, setUrlParams] = useSearchParams();

    const currentGenreId = Number(urlParams.get("genreId"));
    const currentPage = Number(urlParams.get("page") || "1");
    const currentSort = urlParams.get("sort") || "popularity.desc";


    useEffect(() => {
        dispatch(genreActions.loadGenres());
    }, [dispatch]);


    useEffect(() => {
        if (currentGenreId) {
            dispatch(movieActions.loadMoviesByGenre({
                genreId: currentGenreId,
                page: currentPage,
                sort: currentSort
            }));
        }
    }, [dispatch, currentGenreId, currentPage, currentSort]);



    const handleGenreSelection = useCallback((id: number) => {

        setUrlParams({genreId: id.toString(), page: "1", sort: currentSort});
    }, [setUrlParams, currentSort]);



    const handleSortOptionChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSortValue = e.target.value;


        setUrlParams({genreId: currentGenreId.toString(), page: "1", sort: newSortValue});
    }, [setUrlParams, currentGenreId]);


    if (!availableGenres || availableGenres.length === 0) {
        return <p className="text-center py-6 text-xl font-bold text-gray-700">Завантаження каталогу...</p>;
    }

    return (
        <div className="p-8 max-w-6xl mx-auto">


            <div className="flex justify-end items-center mb-6">
                <label className="mr-3 font-semibold text-gray-600 uppercase text-sm">Сортувати за:</label>
                <select
                    value={currentSort}
                    onChange={handleSortOptionChange}
                    className="border border-gray-300 rounded-lg px-3 py-1.5 text-gray-800 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                    <option value="popularity.desc"> ↑ Популярність</option>
                    <option value="popularity.asc"> ↓ Популярність</option>
                    <option value="vote_average.desc"> ↑ Рейтинг</option>
                    <option value="vote_average.asc"> ↓ Рейтинг</option>
                    <option value="release_date.desc"> ↑ Рік (Нові)</option>
                    <option value="release_date.asc"> ↓ Рік (Старі)</option>
                </select>
            </div>


            <div className="flex flex-wrap gap-3 mb-10 border-b border-gray-200 pb-4">
                {availableGenres.map((genre) => (
                    <GenreBadge
                        key={genre.id}
                        id={genre.id}
                        name={genre.name}
                        onClick={() => handleGenreSelection(genre.id)}

                    />
                ))}
            </div>


            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                {filteredMovies.map((movie) => (
                    <MovieDetailCard key={movie.id} movie={movie}/>
                ))}
            </div>

        </div>
    );
};