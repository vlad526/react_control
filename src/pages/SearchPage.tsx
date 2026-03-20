import {useAppSelector} from "../components/store/store.ts";
import {MovieDetailCard} from "../components/movies-detail-card/MovieDetailCard.tsx";

export const SearchPage = () => {
    const searchResults = useAppSelector(state => state.movieStoreSlice.searchResults);
    const hasSearch = searchResults.length > 0;

    return (
        <div>

            {hasSearch && (
                <section>
                    <h2 className="text-2xl font-semibold text-center text-gray-800">Search results:</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        {searchResults.map(movie => (
                            <MovieDetailCard key={movie.id} movie={movie}/>
                        ))}
                    </div>

                </section>
            )}

        </div>
    );
};