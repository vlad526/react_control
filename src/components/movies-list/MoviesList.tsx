import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../store/store.ts";
import {movieActions} from "../../slices/movieSlice.ts";
import {MovieDetailCard} from "../movies-detail-card/MovieDetailCard.tsx";
import {useSearchParams} from "react-router-dom";


const MoviesList = () => {

    const dispatch = useAppDispatch();
    const movies = useAppSelector(state => state.movieStoreSlice.movies);
    const [searchParams] = useSearchParams({page: '1'});

    useEffect(() => {
        const currentPage = searchParams.get("page") || '1';

        dispatch(movieActions.loadMovies(currentPage));
    }, [dispatch, searchParams]);


    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '30px'
        }}>

            {movies &&
                movies.map((movie) => <MovieDetailCard key={movie.id} movie={movie}/>)
            }

        </div>
    );
};

export default MoviesList;

