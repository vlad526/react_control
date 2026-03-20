import {useEffect} from "react";
import Slider from "react-slick";
import {movieActions} from "../slices/movieSlice.ts";
import {useAppDispatch, useAppSelector} from "../components/store/store.ts";
import {MovieDetailCard} from "../components/movies-detail-card/MovieDetailCard.tsx";

export const MainPage = () => {
    const dispatch = useAppDispatch();
    const movies = useAppSelector((state) => state.movieStoreSlice.movies);

    useEffect(() => {
        dispatch(movieActions.loadMovies("1"));
    }, [dispatch]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        responsive: [
            {breakpoint: 1024, settings: {slidesToShow: 3}},
            {breakpoint: 768, settings: {slidesToShow: 2}},
            {breakpoint: 480, settings: {slidesToShow: 1}}
        ]
    };

    return (
        <main className="p-6">

            <section className="mb-10">
                <h2 className="text-xl font-bold mb-4 text-gray-700">Trending Movies</h2>


                <Slider {...settings}>
                    {movies?.length > 0 ? (
                        movies.slice(0, 21).map((movie) => (
                            <div key={movie.id} className="p-2">
                                <MovieDetailCard movie={movie}/>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">Loading movies...</p>
                    )}
                </Slider>

            </section>

        </main>
    );
};



























